import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching study materials:', error);
    } finally {
      setLoading(false);
    }
  };

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
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials.map((material) => (
        <Card key={material.id} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{material.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {material.description && (
              <p className="text-sm text-gray-500 mb-4">{material.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {new Date(material.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                {material.converted_audio_path ? (
                  <>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    <Clock className="w-4 h-4 mr-1" />
                    Converting...
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudyMaterialList;