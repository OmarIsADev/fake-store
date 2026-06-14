import { Star, ShoppingCart } from "lucide-react";
import { type Product } from "../../services/fakestoreapi";
import Button from "./button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-secondary/15 bg-white/40 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md hover:border-secondary/30">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-white flex items-center justify-center relative mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full max-h-40 object-contain object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Tag */}
        {product.category && (
          <span className="absolute top-3 left-3 rounded-full bg-secondary/25 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-text/80 backdrop-blur-xs">
            {product.category}
          </span>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col mb-4">
        <h3 className="text-sm font-bold text-text/90 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors duration-200">
          {product.title}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-text/80">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="text-[10px] text-text/45">
              ({product.rating.count} reviews)
            </span>
          </div>
        )}

        <p className="text-xs text-text/60 line-clamp-2 mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-secondary/10 mt-auto">
        <span className="text-lg font-extrabold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <Button
          variant="secondary"
          className="px-4 py-1.5 text-xs rounded-lg flex items-center gap-1"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add
        </Button>
      </div>
    </article>
  );
}
