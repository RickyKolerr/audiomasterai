import * as z from "zod"

// User related schemas
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Profile related schemas
export const profileSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  bio: z.string().max(160, "Bio must not exceed 160 characters").optional(),
})

// Feedback related schemas
export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Please provide more detailed feedback").max(500),
})

// Study material related schemas
export const studyMaterialSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().max(500).optional(),
})

// Book related schemas
export const bookUploadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z.instanceof(File).refine((file) => {
    const validTypes = ['application/pdf', 'application/epub+zip']
    return validTypes.includes(file.type)
  }, "Only PDF and EPUB files are allowed"),
})