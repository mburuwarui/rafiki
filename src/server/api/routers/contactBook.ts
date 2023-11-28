import { desc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contactBook } from "~/server/db/schema";

export const contactBookRouter = createTRPCRouter({
  postForm: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        number: z.string(),
        residence: z.string(),
        property: z.string(),
        units: z.string(),
        volume: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .insert(contactBook)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            number: input.number,
            residence: input.residence,
            property: input.property,
            units: input.units,
            volume: input.volume,
            message: input.message,
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
          .from(contactBook)
          .orderBy(desc(contactBook.createdAt));
      } catch (error) {
        console.log(error);
      }
    }),
});
