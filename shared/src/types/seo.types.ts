export interface ISeoData {
  title: string;
  description: string;
  keywords: string;
  openGraph?: {
    url?: string;
    type?: "website" | "article";
    image?: string;
  };
  twitter?: {
    image?: string;
  };
}
