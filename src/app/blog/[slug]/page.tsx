import { allBlogs, Blog } from "contentlayer/generated";
// import { BookDemo } from "~/components/BookDemo/BookDemo";
import BlogLayout from "~/app/_components/BlogPlatform/BlogLayout";
import { BlogComponent } from "~/app/_components/BlogPlatform/BlogComponent";
// import { CommentHtml } from "~/components/CommentHtml/CommentHtml";
// import { EmailBanner } from "~/components/EmailBanner/EmailBanner";

export const generateStaticParams = async () =>
  allBlogs.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: Blog }) => {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  
  return (
    <>
      <BlogLayout props={post}>
        <BlogComponent props={post} />
      </BlogLayout>
    </>
  );
};

export default PostLayout;
