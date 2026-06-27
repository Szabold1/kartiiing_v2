import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageParagraph({ src, alt, caption }: Props) {
  return (
    <figure className="mt-5">
      <Image
        src={src}
        alt={alt}
        className="rounded-2xl w-full h-auto dark:brightness-85 transition-all duration-300"
        width={500}
        height={300}
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
