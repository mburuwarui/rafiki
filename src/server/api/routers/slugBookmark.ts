import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { slugBookmark, commentPost } from "~/server/db/schema";

export const slugBookmarkRouter = createTRPCRouter({
  bookmarkSlug: protectedProcedure
    .input(
      z.object({
        bookmark: z.boolean(),
        slugId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        await ctx.db
          .insert(slugBookmark)
          .values({
            bookmark: input.bookmark,
            userId,
            slugId: input.slugId,
          });
      } catch (error) {
        console.log(error);
      }
    }),
  getBookmarkById: publicProcedure
    .input(
      z.object({
        bookmark: z.boolean(),
        slugId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .select()
          .from(slugBookmark)
          .leftJoin(commentPost, eq(slugBookmark.slugId, commentPost.slug))
          .where(eq(slugBookmark.bookmark, input.bookmark))
          .orderBy(
            asc(slugBookmark.slugId),
          );
      } catch (error) {
        console.log(error);
      }
    }),
  deleteBookmarkSlug: protectedProcedure
    .input(
      z.object({
        slugId: z.string(), // Assuming id is a number, adjust the type if needed
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .delete(slugBookmark)
          .where(eq(slugBookmark.slugId, input.slugId));
      } catch (error) {
        console.log(error);
      }
    }),
});
