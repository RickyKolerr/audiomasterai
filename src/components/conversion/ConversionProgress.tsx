import { Progress } from "@/components/ui/progress";

interface ConversionProgressProps {
  status: string;
  progress: number;
  error?: string;
}

const ConversionProgress = ({ status, progress, error }: ConversionProgressProps) => {
  if (status !== "processing" && !error) return null;

  return (
    <div className="space-y-2">
      {status === "processing" && (
        <>
          <div className="flex justify-between text-sm">
            <span>Converting book to audio...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </>
      )}
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ConversionProgress;