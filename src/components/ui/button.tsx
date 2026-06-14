import { cn } from "@sglara/cn";
import {
  cloneElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "bordered";
  size?: "default" | "icon";
}

const variantStyles = {
  primary: "bg-primary hover:bg-primary/80",
  secondary: "bg-secondary/30 hover:bg-secondary/20",
  bordered:
    "bg-transparent border border-secondary/30 hover:border-transparent hover:bg-secondary/30",
};

const sizeStyles = {
  default: "px-8 py-3",
  icon: "p-2.5",
};

function Button({
  children,
  className,
  asChild = false,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const classNames = cn(
    "rounded-lg cursor-pointer",
    variantStyle,
    sizeStyle,
    className,
  );

  if (asChild) {
    return cloneElement(children as ReactElement<any>, {
      ...props,
      className: classNames,
      tabIndex: 0,
    });
  }

  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}

export default Button;
