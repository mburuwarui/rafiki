import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { slugLike, commentPost } from "~/server/db/schema";

export const slugLikeRouter = createTRPCRouter({
  likeSlug: protectedProcedure
    .input(
      z.object({
        like: z.boolean(),
        slugId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        await ctx.db
          .insert(slugLike)
          .values({
            like: input.like,
            userId,
            slugId: input.slugId,
          });
      } catch (error) {
        console.log(error);
      }
    }),
  getLikeById: publicProcedure
    .input(
      z.object({
        like: z.boolean(),
        slugId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .select()
          .from(slugLike)
          .leftJoin(commentPost, eq(slugLike.slugId, commentPost.slug))
          .where(eq(slugLike.like, input.like))
          .orderBy(
            asc(slugLike.slugId),
          );
      } catch (error) {
        console.log(error);
      }
    }),
  deleteLikeSlug: protectedProcedure
    .input(
      z.object({
        slugId: z.string(), // Assuming id is a number, adjust the type if needed
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .delete(slugLike)
          .where(eq(slugLike.slugId, input.slugId));
      } catch (error) {
        console.log(error);
      }
    }),
});
