import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageParagraph({ src, alt, caption }: Props) {
  return (
    <figure className="mt-5">
      <Image
        src={src}
        alt={alt}
        className="h-auto w-full rounded-2xl transition-all duration-300 dark:brightness-85"
        width={500}
        height={300}
      />
      {caption && (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
