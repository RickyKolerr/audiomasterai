import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ConversionProgress {
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  error?: string;
}

export const useConversionProgress = (bookId: string) => {
  const [progress, setProgress] = useState<ConversionProgress>({
    status: "pending",
    progress: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const subscription = supabase
      .channel(`book-conversion-${bookId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "books",
          filter: `id=eq.${bookId}`,
        },
        (payload) => {
          const { status, conversion_error } = payload.new;
          
          if (status === "processing") {
            setProgress((prev) => ({
              ...prev,
              status: "processing",
              progress: Math.min(prev.progress + 10, 90),
            }));
          } else if (status === "completed") {
            setProgress({
              status: "completed",
              progress: 100,
            });
            toast({
              title: "Conversion Complete",
              description: "Your audio file is ready to play",
            });
          } else if (status === "error") {
            setProgress({
              status: "error",
              progress: 0,
              error: conversion_error || "An error occurred during conversion",
            });
            toast({
              title: "Conversion Error",
              description: conversion_error || "An error occurred during conversion",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [bookId, toast]);

  return progress;
};