
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  progress: number;
  status: string;
  className?: string;
}

const ProgressTracker = ({ progress, status, className }: ProgressTrackerProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span>{status}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressTracker;
