"use client";

import type { Blog } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Button, Image } from "@mantine/core";
import Video from "./video";
import type { Url } from "next/dist/shared/lib/router/router";
import { CommentHtml } from "../CommentHtml/CommentHtml";
import { CommentTiptap } from "../CommentTiptap/CommentTiptap";
import type { Session } from "next-auth";

export function BlogComponent(
  { props, session }: { props: Blog; session: Session | null },
) {
  // Define your custom MDX components.
  const mdxComponents: MDXComponents = {
    // Override the default <a> element to use the next/link component.
    a: ({ href, children }) => <Link href={href as Url}>{children}</Link>,
    // Add a custom component.
    MyComponent: () => <div>Hello World!</div>,
    Button: ({ children }) => <Button>{children}</Button>,
    Image: ({ src, alt }) => (
      <Image
        src={src as string}
        alt={alt as string}
        height={500}
        radius="md"
      />
    ),
    Video,
    CommentTiptap,
    CommentHtml: () => (
      <CommentHtml
        slug={props.slug}
        commentId={0}
        replyCount={0}
        session={session}
      />
    ),
    /**BookDemo: () => <BookDemo />,
    EmailBanner: () => <EmailBanner />,**/
  };

  const Component = useMDXComponent(props.body.code);
  return <Component components={mdxComponents} />;
}
