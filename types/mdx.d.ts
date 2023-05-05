declare module "*.mdx" {
  interface FrontMatter {
    title: string;
    date: Date;
    updated?: Date;
    description: string;
    category: string;
    image: string;
    imageAlt: string;
    linkText: string;
    draft: boolean;
    slug: string;
  }

  export const meta: FrontMatter;
}
