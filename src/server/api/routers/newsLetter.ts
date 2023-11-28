import { desc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { newsLetter } from "~/server/db/schema";

export const newsletterRouter = createTRPCRouter({
  postEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .insert(newsLetter)
          .values({
            email: input.email,
          });
      } catch (error) {
        console.log(error);
      }
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db
          .select()
          .from(newsLetter)
          .orderBy(desc(newsLetter.createdAt));
      } catch (error) {
        console.log(error);
      }
    }),
});
