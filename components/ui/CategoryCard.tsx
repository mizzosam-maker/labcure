import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image?: string;
  count: number;
}

export default function CategoryCard({
  name,
  image,
  count,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(name)}`}
      className="block group"
    >
      {/* Image / Placeholder */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-3 border border-gray-light bg-background">

        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-light text-gray-dark font-medium">
            {name}
          </div>
        )}

        {/* subtle overlay for professional medical feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-center text-foreground group-hover:text-primary transition">
        {name}
      </h3>

      {/* Count */}
      <p className="text-sm text-gray-dark text-center">
        {count} products
      </p>
    </Link>
  );
}