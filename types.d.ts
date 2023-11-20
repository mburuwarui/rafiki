interface BlogProps {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Blog";
  author: string;
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  cover: string;
  category: string;
  /** MDX file body */
  body: MDX;
  readingTime: ReadingTime;
  wordCount: number;
  slug: string;
}

interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

interface CommentPost {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  comment: string | null;
  slug: string | null;
  parentId: number | null;
  // Add user information
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
}

declare module "*.md" {
  const value: string;
  export default value;
}

declare module "@mdx-js/react" {
  import * as React from "react";
  type ComponentType =
    | "a"
    | "blockquote"
    | "code"
    | "delete"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "hr"
    | "img"
    | "inlineCode"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "strong"
    | "sup"
    | "table"
    | "td"
    | "thematicBreak"
    | "tr"
    | "ul";
  export type Components = {
    [key in ComponentType]?: React.ComponentType<{ children: React.ReactNode }>;
  };
  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}
