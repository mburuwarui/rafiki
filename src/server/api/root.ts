import { postRouter } from "~/server/api/routers/post";
import { bookdemoRouter } from "./routers/bookDemo";
import { contactBookRouter } from "./routers/contactBook";
import { slugBookmarkRouter } from "./routers/slugBookmark";
import { slugLikeRouter } from "./routers/slugLike";
import { commentLikeRouter } from "./routers/commentLike";
import { commentPostRouter } from "./routers/commentPost";
import { newsletterRouter } from "./routers/newsLetter";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  bookDemo: bookdemoRouter,
  contactBook: contactBookRouter,
  commentPost: commentPostRouter,
  newsLetter: newsletterRouter,
  commentLike: commentLikeRouter,
  slugLike: slugLikeRouter,
  slugBookmark: slugBookmarkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
