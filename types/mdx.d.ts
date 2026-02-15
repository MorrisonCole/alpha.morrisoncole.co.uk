declare module "*.mdx" {
  import type { ComponentType } from "react";

  interface FrontMatter {
    title: string;
    date: string;
    updated?: string | null;
    description: string;
    category: string;
    image: string;
    imageAlt: string;
    linkText: string;
    draft: boolean;
    slug: string;
  }

  export const frontmatter: FrontMatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
