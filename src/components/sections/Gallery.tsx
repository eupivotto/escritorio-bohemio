import Image from 'next/image'

type GalleryImage = {
  src: string
  alt: string
}

type Props = {
  images: GalleryImage[]
  title?: string
}

export function Gallery({ images, title }: Props) {
  const [main, ...rest] = images

  return (
    <section className="bg-cream-50 px-6 py-20 md:px-16">
      {title && (
        <h2 className="mb-10 font-sans text-4xl font-bold text-ink-900">
          {title}
        </h2>
      )}

      <div className="mx-auto grid max-w-6xl gap-3">
        {/* Asymmetric grid: large left + 2 right */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr_1fr]">
          {main && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:row-span-2">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] hover:scale-105"
              />
            </div>
          )}

          {rest.slice(0, 4).map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
