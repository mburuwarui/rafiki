"use client";

import type { Blog } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Button, Image } from "@mantine/core";
import Video from "./video";

export function BlogComponent({ props }: { props: Blog }) {
  // Define your custom MDX components.
  const mdxComponents: MDXComponents = {
    // Override the default <a> element to use the next/link component.
    a: ({ href, children }) => <Link href={href}>{children}</Link>,
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
    /**CommentHtml: () => (
      <CommentHtml
        slug={blog.slug}
        setReplying={() => {}}
        commentId={0}
        replyCount={0}
      />
    ),
    BookDemo: () => <BookDemo />,
    EmailBanner: () => <EmailBanner />,**/
  };

  const Component = useMDXComponent(props.body.code);
  return <Component components={mdxComponents} />;
}
