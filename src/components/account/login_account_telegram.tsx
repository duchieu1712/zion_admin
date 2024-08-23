import { useEffect, useRef } from "react";

export interface TelegramLoginButtonProps {
  botName: string;
  dataOnAuth?: (user: TelegramUser) => void;
  dataAuthUrl?: string;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: boolean;
  usePic?: boolean;
  lang?: string;
  className?: string;
}

export interface TelegramUser {
  auth_date: number;
  id: number;
  first_name: string;
  last_name: string;
  hash: string;
  username: string;
  photo_url: string;
}

function TelegramLogin(props: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {
      botName,
      buttonSize = "large",
      cornerRadius,
      requestAccess,
      usePic = true,
      dataOnAuth,
      dataAuthUrl,
      lang = "en",
    } = props;

    if (!!dataAuthUrl === !!dataOnAuth) {
      throw new Error(
        "One of this props should be defined: dataAuthUrl (Redirect URL), dataOnAuth (callback fn) should be defined.",
      );
    }

    if (dataOnAuth) {
      const windowH = window as any;
      windowH.telegramLoginWidgetCb = dataOnAuth;
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    const attributes = {
      "data-telegram-login": botName,
      "data-size": buttonSize,
      "data-radius": cornerRadius,
      "data-request-access": requestAccess ? "write" : undefined,
      "data-userpic": usePic,
      "data-lang": lang,
      "data-auth-url": dataAuthUrl,
      "data-onauth": "telegramLoginWidgetCb(user)",
      original: "https://petite-bears-tease.loca.lt",
    };

    for (const [k, v] of Object.entries(attributes)) {
      v !== undefined && script.setAttribute(k, `${v}`);
    }

    containerRef.current!.appendChild(script);
    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line
        containerRef.current.innerHTML = "";
      }
      if ((window as any).telegramLoginWidgetCb) {
        delete (window as any).telegramLoginWidgetCb;
      }
    };
    // eslint-disable-next-line
  }, []);

  return <div className={props.className} ref={containerRef}></div>;
}

export default TelegramLogin;
