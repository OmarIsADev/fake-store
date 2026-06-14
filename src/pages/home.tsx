import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import { getProducts, type Product } from "../services/fakestoreapi";
import ProductCard from "../components/ui/product-card";

function Home() {
  return (
    <main className="min-h-screen bg-background text-text overflow-hidden">
      <Hero />
      <Products />
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

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, idx) => (
      <div key={idx} className="bg-white/40 dark:bg-black/20 border border-secondary/10 rounded-2xl p-4 animate-pulse">
        <div className="aspect-square bg-secondary/10 dark:bg-secondary/5 rounded-xl mb-4" />
        <div className="h-4 bg-secondary/20 dark:bg-secondary/10 rounded w-1/3 mb-2" />
        <div className="h-6 bg-secondary/20 dark:bg-secondary/10 rounded w-3/4 mb-3" />
        <div className="h-4 bg-secondary/20 dark:bg-secondary/10 rounded w-1/2 mb-4" />
        <div className="flex justify-between items-center pt-2 border-t border-secondary/5">
          <div className="h-6 bg-secondary/20 dark:bg-secondary/10 rounded w-1/4" />
          <div className="h-9 bg-secondary/20 dark:bg-secondary/10 rounded-lg w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold tracking-tight mb-8">Featured Products</h2>
        <SkeletonGrid />
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-500 mb-2">Error Loading Products</h3>
          <p className="text-sm text-text/80 mb-6">{error.message}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-secondary/10">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Featured Products</h2>
          <p className="text-sm text-text/50 mt-1">Explore our latest arrivals</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Home;
