import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { commentLike, commentPost, users } from "~/server/db/schema";

export const commentPostRouter = createTRPCRouter({
  postComment: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        slug: z.string(),
        parentId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        await ctx.db
          .insert(commentPost)
          .values({
            comment: input.comment,
            slug: input.slug,
            userId,
            parentId: input.parentId,
          });
      } catch (error) {
        console.log(error);
      }
    }),
  countLikes: protectedProcedure
    .input(
      z.object({
        likeCount: z.number(),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(commentPost)
          .set({
            likeCount: input.likeCount,
          })
          .where(eq(commentPost.id, input.id));
      } catch (error) {
        console.log(error);
      }
    }),

  getCommentsBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .select()
          .from(commentPost)
          .leftJoin(commentLike, eq(commentPost.id, commentLike.commentPostId))
          .innerJoin(users, eq(commentPost.userId, users.id))
          .where(eq(commentPost.slug, input.slug))
          .orderBy(
            asc(commentPost.parentId),
            asc(commentPost.createdAt),
          );
      } catch (error) {
        console.log(error);
      }
    }),
  deleteComment: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .delete(commentPost)
          .where(eq(commentPost.id, input.id));
      } catch (error) {
        console.log(error);
      }
    }),
});
