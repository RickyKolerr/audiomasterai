import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const StudyMaterialUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

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
      const file = files[0]; // Handle one file at a time
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('study_materials')
        .insert({
          title,
          description,
          file_path: filePath,
          content_type: file.type,
          file_size: file.size,
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
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your study material",
        variant: "destructive",
      });
    }
  };

  return (
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
            />
          </div>
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
                      accept=".pdf,.doc,.docx,.txt,.md"
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Supported files: PDF, DOC, DOCX, TXT, MD
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyMaterialUpload;