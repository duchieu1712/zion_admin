import * as AccountActions from "@/modules/account/actions";
import * as WalletActions from "@/modules/wallet/actions";

import { ContractWallet, Operator } from "nemo-aa/lib/contract-wallet";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { SignOutCustom, saveAccount } from "@/modules/account/utilities";
import { Suspense, lazy, useEffect } from "react";
import { decryptData, saveContractWalletAA } from "@/common/utilities";

import { AccountAbstraction } from "@/types/AccountAbstraction";
import { CHAINID_ETH_AA } from "@/common/constants";
import { ClassWithStaticMethod } from "@/common/static";
import DashboardLayout from "@/layouts/dashboard";
import { LOCALE_STORAGE } from "@/common/enum";
import { endpoints_FetchrpcAA } from "@/common/utilities_config";
import { getContractWalletOperator } from "nemo-aa/lib/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const IndexPage = lazy(() => import("../pages/app"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const ApprovePage = lazy(async () => await import("@/pages/approve"));
export const ApproveZionPage = lazy(async () => await import("@/pages/approve-zion"));

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch<any>();
  const dispatchAccount = (account: any) => dispatch(AccountActions.dataAccountResponse(account));
  const dispatchConnect = () => dispatch(WalletActions.connect());
  const dispatchContractWalletAA = (account: any) =>
    dispatch(AccountActions.contractWalletAA(account));

  const reSignIn = async (): Promise<any> => {
    try {
      const init_data = AccountAbstraction.getTelegramInfoWeb();
      await AccountAbstraction.loginAccount(init_data).then(async (response) => {
        if (!response) return;
        if (response.message) {
          toast.error(response.message);
          return;
        }
        const res = await AccountAbstraction.setupAccountAbstraction({
          id_token: response.id_token,
          name: `${init_data?.first_name} ${init_data?.last_name}`,
          email: "",
          profile_picture: init_data?.photo_url,
        });

        dispatchContractWalletAA(res.contractWallet);
        saveContractWalletAA(res.saveContractWalletAA);
        saveAccount(res.saveAccount);
        dispatchAccount(res.saveAccount);
        ClassWithStaticMethod.SET_USER_INFO(res.saveAccount);
        dispatchConnect();
        localStorage.setItem(LOCALE_STORAGE.IS_LOGINED, "true");
      });
      return true;
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const hasPinCode = async (contractWallet: any) => {
    try {
      const hasPinCode = await contractWallet.hasPINCode();
      return hasPinCode;
    } catch (e) {
      return false;
    }
  };

  const loadContractWalletAA = async (res: any) => {
    const data = localStorage.getItem(LOCALE_STORAGE.CONTRACTWALLETAA);
    const dataDecrypted = decryptData(data);
    if (dataDecrypted) {
      const jsonData = JSON.parse(dataDecrypted);
      // Check Deadline
      if (jsonData.jwtOptions.deadline > new Date().getTime() / 1000) {
        await reSignIn();
        return;
      } else {
        //
        const endpoint = endpoints_FetchrpcAA(CHAINID_ETH_AA);
        const ephemeralKeyPair = Operator.getEphemeralKeyPair(
          endpoint.endpoint,
          jsonData.ephemeralKeyPairPrivateKey,
        );
        const operator = new Operator(
          getContractWalletOperator(CHAINID_ETH_AA),
          ephemeralKeyPair,
          jsonData.beneficiaries,
        );
        const contractWallet = new ContractWallet(jsonData.contractWalletAddress, operator);
        contractWallet.setJWT({
          ...jsonData.jwtOptions,
          ephemeralKeyPair: ephemeralKeyPair,
        });

        const hasPINCode = await hasPinCode(contractWallet);
        dispatchContractWalletAA(contractWallet);
        saveContractWalletAA({
          ephemeralKeyPairPrivateKey: ephemeralKeyPair.privateKey,
          contractWalletAddress: jsonData.contractWalletAddress,
          jwtOptions: jsonData.jwtOptions,
          beneficiaries: jsonData.beneficiaries,
        });

        saveAccount({
          ...res,
          fund_password: hasPINCode,
        });

        dispatchAccount({
          ...res,
          fund_password: hasPINCode,
        });
      }
    }
  };

  const checkLogin = async () => {
    try {
      // extract_secured_methods
      // dispatchConnect();
      // dispatchGetExtract_Secured_Methods();
      const flagSignOut = localStorage.getItem(LOCALE_STORAGE.FLAG_SIGNOUT);

      if (flagSignOut == "true") {
        localStorage.setItem(LOCALE_STORAGE.FLAG_SIGNOUT, "false");
        SignOutCustom(dispatchAccount);
        return;
      }

      const data = decryptData(localStorage.getItem(LOCALE_STORAGE.ACCOUNT));
      if (data && data != "") {
        const jsonData = JSON.parse(data);

        loadContractWalletAA(jsonData);
      } else {
        SignOutCustom(dispatchAccount);
      }
    } catch (error) {
      console.log(error, "errrrrrr");

      SignOutCustom(dispatchAccount);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);



  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "approve", element: <ApprovePage /> },
        { path: "approve-zion", element: <ApproveZionPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  

  return routes;
}