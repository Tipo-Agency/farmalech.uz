"use client"

import { useLanguage } from "@/contexts/language-context"
import { products, type Product } from "./products"
import { productTranslations } from "./product-translations"

export interface TranslatedProduct
  extends Omit<
    Product,
    "name" | "tagline" | "description" | "composition" | "indications" | "dispensing" | "manufacturer"
  > {
  name: string
  tagline: string
  description: string
  composition?: string[]
  indications: string[]
  dispensing?: string
  manufacturer?: string
}

export function useTranslatedProducts(): TranslatedProduct[] {
  const { language } = useLanguage()

  return products.map((product) => {
    const translation = (productTranslations[language] as any)?.[product.slug]

    if (translation) {
      return {
        ...product,
        name: translation.name,
        tagline: translation.tagline,
        description: translation.description,
        composition: translation.composition ? [...translation.composition] : [...product.composition],
        pharmacology: translation.pharmacology || product.pharmacology,
        indications: [...translation.indications],
        usage: translation.usage || product.usage,
        contraindications: translation.contraindications || product.contraindications,
        overdose: translation.overdose || product.overdose,
        releaseForm: translation.releaseForm || product.releaseForm,
        storage: translation.storage || product.storage,
        shelfLife: translation.shelfLife || product.shelfLife,
        dispensing: translation.dispensing || product.dispensing,
        manufacturer: translation.manufacturer || product.manufacturer,
      }
    }

    // Fallback to original if no translation
    return {
      ...product,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      composition: [...product.composition],
      indications: [...product.indications],
      dispensing: product.dispensing,
      manufacturer: product.manufacturer,
    }
  })
}

export function useTranslatedProduct(slug: string): TranslatedProduct | undefined {
  const { language } = useLanguage()
  const product = products.find((p) => p.slug === slug)

  if (!product) return undefined

  const translation = (productTranslations[language] as any)?.[slug]

  if (translation) {
    return {
      ...product,
      name: translation.name,
      tagline: translation.tagline,
      description: translation.description,
      composition: translation.composition ? [...translation.composition] : [...product.composition],
      pharmacology: translation.pharmacology || product.pharmacology,
      indications: [...translation.indications],
      usage: translation.usage || product.usage,
      contraindications: translation.contraindications || product.contraindications,
      overdose: translation.overdose || product.overdose,
      releaseForm: translation.releaseForm || product.releaseForm,
      storage: translation.storage || product.storage,
      shelfLife: translation.shelfLife || product.shelfLife,
      dispensing: translation.dispensing || product.dispensing,
      manufacturer: translation.manufacturer || product.manufacturer,
    }
  }

  // Fallback to original if no translation
  return {
    ...product,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    composition: [...product.composition],
    indications: [...product.indications],
    dispensing: product.dispensing,
    manufacturer: product.manufacturer,
  }
}
