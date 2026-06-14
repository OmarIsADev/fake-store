import Button from "../components/ui/button";
import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <main className="min-h-screen bg-background text-text overflow-hidden">
      <Hero />
    </main>
  );
}

const Hero = () => {
  return (
    <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
      <section className="flex flex-col w-full items-start text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Find Your Perfect{" "}
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Everyday Fit
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-text/70 leading-relaxed mb-8 max-w-lg">
          Explore our curated selection of high-quality electronics, classic
          jewelry, and modern apparel. Crafted for comfort, styled for your
          lifestyle.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            className="group flex items-center gap-2 shadow-lg shadow-primary/25 cursor-pointer"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button variant="bordered" className="cursor-pointer">
            Explore Categories
          </Button>
        </div>
      </section>

      <img
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
        alt="Featured Backpack"
        className="mx-auto h-full max-h-[280px] sm:max-h-[350px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      />
    </header>
  );
};

export default Home;
