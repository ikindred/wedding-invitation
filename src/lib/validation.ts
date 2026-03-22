import { z } from "zod";

/** RSVP payload — mirrors Prisma `Rsvp` model and form fields. */
export const rsvpSchema = z
  .object({
    fullName: z.string().min(1, "Please enter your full name.").max(200),
    email: z.string().max(200).optional(),
    phone: z.string().max(40).optional(),
    attendanceStatus: z.enum(["ACCEPTED", "DECLINED"]),
    guestCount: z.number().int().min(1).max(20).optional(),
    message: z.string().max(2000).optional(),
  })
  .superRefine((data, ctx) => {
    const email = data.email?.trim();
    if (email) {
      const ok = z.string().email().safeParse(email).success;
      if (!ok) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address.",
          path: ["email"],
        });
      }
    }
    if (data.attendanceStatus === "ACCEPTED") {
      if (data.guestCount == null || data.guestCount < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter how many guests will attend (including yourself).",
          path: ["guestCount"],
        });
      }
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
