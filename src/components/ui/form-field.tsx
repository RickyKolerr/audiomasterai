import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({ label, error, className, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input
        {...props}
        className={cn(
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}