import { cn } from "@sglara/cn";
import {
  cloneElement,
  type InputHTMLAttributes,
  type ReactElement,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Prefix?: ReactElement<{ className?: string }>;
  Suffix?: ReactElement<{ className?: string }>;
  classNames?: {
    wrapper?: string;
  };
}

function Input({ classNames = {}, Prefix, Suffix, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "border border-primary/30 rounded-full flex items-center gap-2 p-1 group focus-within:border-primary",
        !Prefix && "pl-4",
        !Suffix && "pr-4",
        classNames.wrapper,
      )}
    >
      {Prefix &&
        cloneElement(Prefix, {
          ...Prefix.props,
          className: cn(Prefix.props.className),
        })}
      <input
        {...props}
        className={cn("outline-none w-full", props.className)}
      />
      {Suffix &&
        cloneElement(Suffix, {
          ...Suffix.props,
          className: cn(Suffix.props.className),
        })}
    </div>
  );
}

export default Input;
