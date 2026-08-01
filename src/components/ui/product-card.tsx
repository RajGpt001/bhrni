import React from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Button, cn } from "./button";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  mrp,
  rating,
  reviews,
  imageUrl,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  className
}: ProductCardProps) {
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className={cn("group relative flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-slate-50">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          onClick={onToggleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-slate-400 backdrop-blur-sm transition-colors hover:text-rose-500"
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-rose-500 text-rose-500")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-slate-800">{title}</h3>
        
        <div className="mt-1 flex items-center gap-1">
          <div className="flex items-center rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
            {rating.toFixed(1)} <Star className="ml-0.5 h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-slate-500">({reviews})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-slate-400 line-through">₹{mrp.toLocaleString('en-IN')}</span>
            {discount > 0 && (
              <span className="text-xs font-bold text-rose-600">{discount}% off</span>
            )}
          </div>
          <Button onClick={onAddToCart} className="mt-3 w-full" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
