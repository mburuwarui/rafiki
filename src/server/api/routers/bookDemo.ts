import { desc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { bookDemo } from "~/server/db/schema";

export const bookdemoRouter = createTRPCRouter({
  postDemo: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        number: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .insert(bookDemo)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            number: input.number,
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
          .from(bookDemo)
          .orderBy(desc(bookDemo.createdAt));
      } catch (error) {
        console.log(error);
      }
    }),
});
