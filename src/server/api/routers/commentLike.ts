import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { commentLike, commentPost } from "~/server/db/schema";

export const commentLikeRouter = createTRPCRouter({
  likeComment: protectedProcedure
    .input(
      z.object({
        like: z.boolean(),
        commentPostId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        await ctx.db
          .insert(commentLike)
          .values({
            like: input.like,
            userId,
            commentPostId: input.commentPostId,
          });
      } catch (error) {
        console.log(error);
      }
    }),
  getLikeById: publicProcedure
    .input(
      z.object({
        like: z.boolean(),
        commentPostId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .select()
          .from(commentLike)
          .leftJoin(commentPost, eq(commentLike.commentPostId, commentPost.id))
          .where(eq(commentLike.like, input.like))
          .orderBy(
            asc(commentLike.commentPostId),
          );
      } catch (error) {
        console.log(error);
      }
    }),
  deleteLike: protectedProcedure
    .input(
      z.object({
        commentPostId: z.number(), // Assuming id is a number, adjust the type if needed
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .delete(commentLike)
          .where(eq(commentLike.commentPostId, input.commentPostId));
      } catch (error) {
        console.log(error);
      }
    }),
});
