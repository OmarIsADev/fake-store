import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./button";
import { cn } from "@sglara/cn";

type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(DropdownContext);
  if (!context) return null;
  const { setOpen, open } = context;

  const handleOnClick = () => {
    setOpen(!open);
  };

  if (isValidElement(children))
    return cloneElement(children, {
      ...(children.props as React.PropsWithChildren<any>),
      onClick: handleOnClick,
    });
  else return <Button onClick={handleOnClick}>{children}</Button>;
};

export const DropdownContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(DropdownContext);
  if (!context) return null;
  const { open } = context;

  if (open)
    return (
      <div className="absolute top-12 z-50 w-max origin-top-right right-0 rounded-xl border border-secondary/20 bg-background/95 backdrop-blur-md p-2 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    );
  return null;
};

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
  className?: string;
}

export const DropdownItem = ({
  children,
  variant = "default",
  className,
  ...props
}: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  const defaultStyles =
    "block w-full text-start rounded-lg px-4 py-2 text-sm transition-colors";
  const variantStyles = {
    default: "text-text/80 hover:bg-primary/10 hover:text-primary ",
    destructive: "text-red-500 hover:bg-red-500/10",
  };

  const styles = cn(defaultStyles, variantStyles[variant], className);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    context?.setOpen(false);
  };

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...(children.props as React.PropsWithChildren<any>),
      onClick: handleOnClick,
      className: cn(
        (children.props as { className?: string }).className,
        styles,
      ),
    });
  }

  return (
    <button
      role="menuitem"
      {...props}
      className={styles}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Dropdown;
