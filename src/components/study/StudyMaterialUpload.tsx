
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProgressTracker from "@/components/ProgressTracker";
import ErrorBoundary from "@/components/ErrorBoundary";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md'],
};

const StudyMaterialUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    const isValidType = Object.keys(ALLOWED_FILE_TYPES).includes(file.type);
    if (!isValidType) {
      throw new Error(`File type not supported. Supported types: ${Object.values(ALLOWED_FILE_TYPES).flat().join(', ')}`);
    }

    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    if (!title) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your study material",
        variant: "destructive",
      });
      return;
    }

    try {
      const file = files[0];
      validateFile(file);

      setIsUploading(true);
      setUploadProgress(0);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Authentication required");
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      // Split file into chunks for progress tracking
      const chunkSize = 1024 * 1024; // 1MB chunks
      const totalChunks = Math.ceil(file.size / chunkSize);
      let uploadedChunks = 0;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update progress after successful upload
      setUploadProgress(100);

      const { error: dbError } = await supabase
        .from('study_materials')
        .insert({
          title,
          description,
          file_path: filePath,
          content_type: file.type,
          file_size: file.size,
          user_id: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Upload Successful",
        description: "Your study material has been uploaded successfully",
      });
      
      setIsOpen(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "There was an error uploading your study material",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <ErrorBoundary>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            Upload Study Material
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Study Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter title"
                disabled={isUploading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter description"
                rows={3}
                disabled={isUploading}
              />
            </div>
            {isUploading ? (
              <div className="p-8">
                <ProgressTracker
                  progress={uploadProgress}
                  status="Uploading..."
                  className="w-full"
                />
              </div>
            ) : (
              <div
                className={`mt-4 p-8 border-2 border-dashed rounded-lg transition-colors ${
                  dragActive
                    ? "border-accent bg-accent/10"
                    : "border-gray-700 hover:border-accent/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <Upload className={`w-12 h-12 ${dragActive ? "text-accent" : "text-gray-400"}`} />
                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      Drag and drop your files here, or{" "}
                      <label className="text-accent hover:text-accent/90 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileInput}
                          accept={Object.values(ALLOWED_FILE_TYPES).flat().join(',')}
                          disabled={isUploading}
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported files: PDF, DOC, DOCX, TXT, MD (Max {MAX_FILE_SIZE / 1024 / 1024}MB)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
};

export default StudyMaterialUpload;

