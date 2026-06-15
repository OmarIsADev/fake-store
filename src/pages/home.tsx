import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import {
  getProducts,
  getCategories,
  type Product,
} from "../services/fakestoreapi";
import ProductCard from "../components/ui/product-card";
import { useStore } from "../context/store-context";
import Search from "../components/core/search";

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
          <Button variant="bordered" asChild className="cursor-pointer">
            <a href="#products">Explore Categories</a>
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
      <div
        key={idx}
        className="bg-white/40 dark:bg-black/20 border border-secondary/10 rounded-2xl p-4 animate-pulse"
      >
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
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } =
    useStore();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce search input to avoid filtering on every keystroke
  useEffect(() => {
    if (!searchQuery) {
      setDebouncedSearchQuery("");
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Load products and categories on mount
  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter products client-side based on category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold tracking-tight mb-8">
          Featured Products
        </h2>
        <SkeletonGrid />
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-500 mb-2">
            Error Loading Products
          </h3>
          <p className="text-sm text-text/80 mb-6">{error.message}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      id="products"
    >
      {/* Filter / Search Control Header */}
      <div className="flex flex-col gap-6 mb-10 pb-6 border-b border-secondary/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-text/50 mt-1">
              Explore our latest arrivals
            </p>
          </div>

          {/* Search Input inline with categories */}
          <Search className="w-full md:w-72" />
        </div>

        {/* Category Filter Tab Row */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-secondary/10 text-text/80 hover:bg-secondary/20"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer capitalize whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-secondary/10 text-text/80 hover:bg-secondary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="text-center py-20 bg-secondary/5 rounded-3xl border border-dashed border-secondary/20 max-w-xl mx-auto px-6">
          <AlertCircle className="w-12 h-12 text-text/40 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text mb-2">
            No Products Found
          </h3>
          <p className="text-sm text-text/60 mb-6">
            We couldn't find any products matching your search term or category
            filters.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
