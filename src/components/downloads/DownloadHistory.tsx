
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText } from "lucide-react";
import AudioPlayer from "@/components/audio/AudioPlayer";

const DownloadHistory = () => {
  const { data: downloads, isLoading } = useQuery({
    queryKey: ['downloads'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from('downloads')
        .select(`
          *,
          audiobooks (
            title,
            audio_file_path
          )
        `)
        .eq('user_id', session.user.id)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading download history...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Download History</h2>
      <ScrollArea className="h-[600px]">
        <div className="space-y-6">
          {downloads?.map((download) => (
            <Card key={download.id} className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium">{download.audiobooks?.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(download.downloaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
              {download.audiobooks?.audio_file_path && (
                <AudioPlayer 
                  src={`${supabase.storage.from('audio').getPublicUrl(download.audiobooks.audio_file_path).data.publicUrl}`}
                  title={download.audiobooks?.title}
                />
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default DownloadHistory;
