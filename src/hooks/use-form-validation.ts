import { useState } from "react"
import { ZodSchema } from "zod"

interface FormValidationHook<T> {
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (field: keyof T, value: any) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
}

export function useFormValidation<T>(initialData: T, schema: ZodSchema): FormValidationHook<T> {
  const [formData, setFormData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    try {
      schema.parse(formData)
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

  const resetForm = () => {
    setFormData(initialData)
    setErrors({})
  }

  return { formData, errors, handleChange, validateForm, resetForm, setErrors }
}