import Image from "next/image"

interface ProductImageProps {
  product: { name: string; image: string; imageViewport?: string }
  size?: number
  className?: string
}

export function ProductImage({ product, size = 400, className }: ProductImageProps) {
  // Display the pack area of the original brochure artwork without changing it.
  if (product.imageViewport) {
    return (
      <svg
        viewBox={product.imageViewport}
        width={size}
        height={size}
        role="img"
        aria-label={product.name}
        className={className}
      >
        <title>{product.name}</title>
        <image href={product.image} width="1000" height="1414" />
      </svg>
    )
  }

  return <Image src={product.image || "/placeholder.svg"} alt={product.name} width={size} height={size} className={className} />
}
