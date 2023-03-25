import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const sendTextToEmail = async (text: string) => {
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    body: JSON.stringify({
      from: {
        email: "no-reply@smartseats.co",
      },
      personalizations: [
        {
          to: [
            {
              email: "rayhan.dev.bd+askMeAnything@gmail.com",
            },
          ],
          dynamic_template_data: {
            text,
          },
        },
      ],
      template_id: "d-403852b777bf4c87bd4bcab5e07a4c2d",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
    },
  });
};

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.annonymousMessage.create({
        data: {
          text: input.text,
        },
      });
      await sendTextToEmail(input.text);
      return message;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.annonymousMessage.findMany({
        skip: (input.page - 1) * input.limit,
        take: input.limit,
      });
    }),
});
