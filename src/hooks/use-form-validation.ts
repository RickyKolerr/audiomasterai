import { useState } from "react"
import { ZodSchema } from "zod"

export function useFormValidation<T>(schema: ZodSchema) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const validate = (data: T): boolean => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (error: any) {
      const formattedErrors: Partial<Record<keyof T, string>> = {}
      error.errors.forEach((err: any) => {
        const path = err.path[0] as keyof T
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return false
    }
  }

  return { errors, validate, setErrors }
}