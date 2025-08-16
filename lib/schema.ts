import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters :)"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters :)")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter !")
      .regex(/[0-9]/, "Must contain at least one number !"),
    confirmPassword: z.string(),
    age: z
      .number()
      .min(18, "Age must be at least 18")
      .max(100, "Age must be at most 100")
      .optional(),

    role: z.enum(["User", "Admin", "Moderator"]),
    terms: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords are not match...",
  });
