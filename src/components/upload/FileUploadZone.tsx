import { useState, useCallback } from "react";
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

const FileUploadZone = ({
  onFileSelect,
  acceptedFileTypes = [".pdf", ".txt", ".docx"],
  maxSizeMB = 10,
  className,
}: FileUploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(`Only ${acceptedFileTypes.join(", ")} files are allowed`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect, acceptedFileTypes, maxSizeMB]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect, acceptedFileTypes, maxSizeMB]);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 transition-colors",
          dragActive
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50",
          error && "border-destructive",
          selectedFile && !error && "border-green-500"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileInput}
          id="file-upload"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          {selectedFile ? (
            <>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={removeFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {!error && <CheckCircle className="w-6 h-6 text-green-500" />}
            </>
          ) : (
            <>
              <Upload
                className={cn(
                  "w-12 h-12",
                  dragActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here, or{" "}
                  <label
                    htmlFor="file-upload"
                    className="text-primary hover:text-primary/90 cursor-pointer"
                  >
                    browse
                  </label>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported files: {acceptedFileTypes.join(", ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max size: {maxSizeMB}MB
                </p>
              </div>
            </>
          )}
          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;