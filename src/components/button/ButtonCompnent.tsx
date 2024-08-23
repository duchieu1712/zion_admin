import React from "react";

type ButtonProps = {
  disabled?: boolean;
  onClick?: (e?: any) => void;
  width?: number | string;
  title?: string | JSX.Element;
  className?: string;
  onProcessing?: boolean;
  icon?: React.ReactNode;
  background?: string;
  transparent?: boolean;
};

/**
 *
 * @param  {ButtonProps} props
 * @returns {React.ReactNode}
 */

export const ButtonComponent = (props: ButtonProps) => {
  const disabled = props.disabled
    ? "bg-disabledBtn cursor-not-allowed"
    : props.transparent
      ? "bg-transparent border border-secondary"
      : (props.background ?? "bg-purple");
  const width = props.width ? props?.width : "w-full";
  return (
    <button
      type="submit"
      disabled={props.disabled}
      onClick={props.onClick}
      className={`rounded-3xl h-[42px] active:opacity-80 focus:opacity-80 ${disabled} ${width} text-white ${props.icon ? "flex items-center justify-center gap-2" : ""} font-bold ${props.className ?? ""}`}
    >
      {props.icon && props.icon}
      {props.onProcessing ? "Loading..." : props.title}
    </button>
  );
};
