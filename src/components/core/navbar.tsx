import { useEffect, useRef, useState } from "react";
import { ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import Button from "../ui/button";
import Search from "./search";
import { cn } from "@sglara/cn";
import Dropdown, {
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../ui/dropdown";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Categories", href: "#", hasDropdown: true },
  { name: "Deals", href: "#" },
  { name: "About", href: "#" },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [hoveredElement, setHoveredElement] = useState<{
    offsetLeft: number;
    offsetWidth: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const { offsetLeft, offsetWidth } = e.currentTarget;

    if (!isVisible) {
      setIsTransitionEnabled(false);
      setHoveredElement({ offsetLeft, offsetWidth });
      setIsVisible(true);

      setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 20);
    } else {
      setHoveredElement({ offsetLeft, offsetWidth });
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/20 bg-background/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xl font-bold">
            Store <span className="text-primary">Name</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="relative hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={link.href}
                className="group flex items-center gap-1 text-sm font-medium text-text/80 hover:text-primary transition-colors py-2"
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                )}
              </a>
            </div>
          ))}
          <span
            className={cn(
              "absolute bottom-0 h-0.5 bg-primary ease-out pointer-events-none",
              isTransitionEnabled && "transition-all duration-300",
              isVisible && hoveredElement ? "opacity-100" : "opacity-0",
            )}
            style={{
              left: hoveredElement ? `${hoveredElement.offsetLeft}px` : "0px",
              width: hoveredElement ? `${hoveredElement.offsetWidth}px` : "0px",
            }}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Search className="hidden lg:flex" />

          <div className="bg-primary/30 flex gap-1 rounded-lg">
            <Button
              variant="primary"
              className="bg-transparent"
              title="Cart"
              size="icon"
            >
              <ShoppingBag className="w-5 h-5 text-text/80" />
            </Button>

            <div className="grow my-1 w-px bg-primary/40" />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="primary"
                  className="transition-colors bg-transparent"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  title="Account"
                  size="icon"
                >
                  <User className="w-5 h-5 text-text/80" />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem>Orders</DropdownItem>
                <div className="w-full h-px bg-secondary/20 my-1" />
                <DropdownItem variant="destructive">Sign Out</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>

          {/* Mobile Menu Hamburger */}
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text" />
            ) : (
              <Menu className="w-5 h-5 text-text" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-secondary/10 bg-background/95 backdrop-blur-md py-4 px-6 animate-in slide-in-from-top duration-300">
          <div className="mb-4">
            <Search />
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between text-base font-medium text-text/80 hover:text-primary transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-text/40" />
                )}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
