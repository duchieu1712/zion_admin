"use client";

import { lazy } from "react";
import { useSearchParams } from "react-router-dom";

const InfoCID_ZIONComponent = lazy(async () => await import("./InfoCID_ZIONComponent"));

const LoginButtonComponent = lazy(async () => await import("./LoginButtonComponent"));

export default function ApproveCID_ZIONComponent() {
  const [searchParam] = useSearchParams();
  const cid = searchParam.get("cid");
  if (!cid) return <p>Not contain CID</p>;

  return (
    <div className="m-auto max-w-[800px] flex flex-col gap-6 mt-20 items-center justify-center p-9 rounded-lg">
      <InfoCID_ZIONComponent cid={cid} />
      <LoginButtonComponent />
    </div>
  );
}
