import * as AccountActions from "../../modules/account/actions";
import * as AccountReducers from "../../modules/account/reducers";
import * as WalletActions from "../../modules/wallet/actions";

import { alpha, useTheme } from "@mui/material/styles";
import { decryptData, saveContractWalletAA, saveInfoTelegram } from "@/common/utilities";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { AccountAbstraction } from "@/types/AccountAbstraction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { ClassWithStaticMethod } from "@/common/static";
import Iconify from "../../components/iconify/iconify";
import { LOCALE_STORAGE } from "@/common/enum";
import Logo from "../../components/logo/logo";
import Stack from "@mui/material/Stack";
import { TelegramUser } from "@/components/account/login_account_telegram";
import Typography from "@mui/material/Typography";
import { bgGradient } from "../../theme/css";
import { saveAccount } from "@/modules/account/utilities";
import { toast } from "react-toastify";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [processLoading, setOnProcessing] = useState(false);
  const accountWeb = useSelector(AccountReducers.dataAccount);
  const dispatch = useDispatch<any>();
  const dispatchAccount = (account: any) => dispatch(AccountActions.dataAccountResponse(account));
  const dispatchConnect = () => dispatch(WalletActions.connect());
  const dispatchContractWalletAA = (account: any) =>
    dispatch(AccountActions.contractWalletAA(account));

  const accountInLocalStorage = decryptData(localStorage?.getItem(LOCALE_STORAGE.ACCOUNT));

  const handleTelegramResponse = async (user: TelegramUser) => {
    const init_data = user;
    saveInfoTelegram(user);
    try {
      setOnProcessing(true);
      await AccountAbstraction.loginAccount(init_data).then(async (response) => {
        if (!response) return;
        if (response.message) {
          toast.error(response.message);
          setOnProcessing(false);
          return;
        }
        const res = await AccountAbstraction.setupAccountAbstraction({
          id_token: response.id_token,
          name: `${init_data?.first_name} ${init_data?.last_name}`,
          email: "",
          profile_picture: init_data.photo_url,
        });
        dispatchContractWalletAA(res?.contractWallet);
        saveContractWalletAA(res?.saveContractWalletAA);
        saveAccount(res?.saveAccount);
        dispatchAccount(res?.saveAccount);
        ClassWithStaticMethod.SET_USER_INFO(res?.saveAccount);
        dispatchConnect();
        localStorage.setItem(LOCALE_STORAGE.IS_LOGINED, "true");
        setOnProcessing(false);
      });
      setOnProcessing(false);
      return true;
    } catch (e: any) {
      console.log(e.message);

      setOnProcessing(false);
      toast.error(e.message);
    }
  };

  const loading = processLoading || accountInLocalStorage;

  if (accountWeb) {
    // router.back()
    const from = location.state?.from?.pathname;
    navigate(from, { replace: true });
  }

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Zion Admin</Typography>

          {loading && !accountWeb && (
            <Stack direction="row" justifyContent="center">
              <CircularProgress size={25} />
            </Stack>
          )}
          {!loading && (
            <Button
              variant="outlined"
              sx={{ width: "100%", marginTop: "40px" }}
              startIcon={<Iconify icon="logos:telegram" />}
              onClick={() => {
                handleTelegramResponse({
                  id: 1321039544,
                  first_name: "Nhật",
                  last_name: "Quang",
                  username: "tnnquang",
                  photo_url:
                    "https://t.me/i/userpic/320/if7Xcx9aYu9K8_BF8_08MAQRWTzBM8p63uxQPMSZRkA.jpg",
                  auth_date: 1724033917,
                  hash: "835aec01ad229545c93c52e781dbf7ac36ea0e9c5842689fea817c69de645bd7",
                } as any);
              }}
            >
              Login with Telegram
            </Button>
          )}
          {/* {renderForm} */}
        </Card>
      </Stack>
    </Box>
  );
}
