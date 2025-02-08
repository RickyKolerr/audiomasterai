
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./button"

interface BackButtonProps {
  className?: string
}

export const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  )
}
