import * as AccountActions from "../../modules/account/actions";
import * as AccountReducers from "../../modules/account/reducers";
import * as WalletActions from "../../modules/wallet/actions";

import { Button, CircularProgress } from "@mui/material";

import { HEADER, NAV } from "./config-layout";
import { saveAccount } from "@/modules/account/utilities";
import { saveContractWalletAA, saveInfoTelegram } from "@/common/utilities";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AccountAbstraction } from "@/types/AccountAbstraction";
import AccountPopover from "./common/account-popover";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { ClassWithStaticMethod } from "@/common/static";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../components/iconify/iconify";
import { LOCALE_STORAGE } from "@/common/enum";
import LanguagePopover from "./common/language-popover";
import NotificationsPopover from "./common/notifications-popover";
import Searchbar from "./common/searchbar";
import Stack from "@mui/material/Stack";
import { TelegramUser } from "@/components/account/login_account_telegram";
import Toolbar from "@mui/material/Toolbar";
import { bgBlur } from "../../theme/css";
import { toast } from "react-toastify";
import { useResponsive } from "../../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }: { onOpenNav: any }) {
  const theme = useTheme();
  const [processLoading, setOnProcessing] = useState(false);
  const lgUp = useResponsive("up", "lg");
  const accountWeb = useSelector(AccountReducers.dataAccount);
  const dispatch = useDispatch<any>();
  const dispatchAccount = (account: any) => dispatch(AccountActions.dataAccountResponse(account));
  const dispatchConnect = () => dispatch(WalletActions.connect());
  const dispatchContractWalletAA = (account: any) =>
    dispatch(AccountActions.contractWalletAA(account));

  // useEffect(() => {
  //   checkLogin();
  //   // eslint-disable-next-line
  // }, []);

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
      setOnProcessing(false);
      toast.error(e.message);
    }
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        {processLoading ? (
          <CircularProgress size={25} />
        ) : accountWeb ? (
          <AccountPopover />
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              handleTelegramResponse({
                auth_date: 1723429356,
                first_name: "Nhật",
                id: 1321039544,
                photo_url:
                  "https://t.me/i/userpic/320/UdrWdfuPBUyyELtHVU2eAMoixyk8SyM3GqYUShEk0MNoPhli8-bNzF-94v-jIvza.jpg",
                username: "tnnquang",
                hash: "84072e838516a04e0e812e0a221d30d206ddd367b201747d0e856a5b7976b12e",
              } as any);
            }}
          >
            Login with Telegram
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={
        {
          boxShadow: "none",
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        } as any
      }
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// Header.propTypes = {
//   onOpenNav: PropTypes.func,
// };
