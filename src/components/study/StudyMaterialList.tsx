
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

interface StudyMaterial {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  converted_audio_path: string | null;
}

const StudyMaterialList = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching study materials:', error);
      setError(error instanceof Error ? error : new Error('Failed to fetch materials'));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="p-6 text-center">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">{error.message}</p>
          <Button onClick={() => fetchMaterials()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardHeader>
          <CardTitle>No Study Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            You haven't uploaded any study materials yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <Card key={material.id} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {material.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{material.description}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {new Date(material.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {material.converted_audio_path ? (
                    <>
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        <Play className="w-4 h-4 mr-1 md:mr-2" />
                        <span className="hidden md:inline">Play</span>
                      </Button>
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        <Download className="w-4 h-4 mr-1 md:mr-2" />
                        <span className="hidden md:inline">Download</span>
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="whitespace-nowrap">
                      <Clock className="w-4 h-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Converting...</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default StudyMaterialList;
