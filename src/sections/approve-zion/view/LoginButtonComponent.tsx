import { ButtonComponent } from "@/components/button/ButtonCompnent";
import * as AccountActions from "@/modules/account/actions";
import * as AccountReducers from "@/modules/account/reducers";
import { SignOutCustom } from "@/modules/account/utilities";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginButtonComponent() {
  const accountWeb = useSelector(AccountReducers.dataAccount);
  const dispatch = useDispatch<any>();
  const dispatchAccount = (account: any) => dispatch(AccountActions.dataAccountResponse(account));
  const [openModal, setOpenModal] = React.useState(false);

  return !accountWeb ? (
    <React.Fragment>
      <ButtonComponent
        title={"Sign in"}
        onClick={() => setOpenModal(true)}
        className="mt-6"
        width={"w-[200px]"}
      />
      {/* <LoginModalComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        backgroundModal="bg-black"
      /> */}
    </React.Fragment>
  ) : (
    <div className="flex flex-col gap-2 mt-2 items-center justify-center">
      <p>Email: {accountWeb.email}</p>
      <p>Address connected: {accountWeb.nemo_address}</p>
      <p>Network: Zion Network</p>
      <ButtonComponent
        title={"Log out"}
        onClick={() => {
          SignOutCustom(dispatchAccount);
        }}
        transparent={true}
        width={"w-[200px]"}
      />
    </div>
  );
}
