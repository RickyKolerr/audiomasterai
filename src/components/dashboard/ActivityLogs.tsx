import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";

const ActivityLogs = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading activity logs...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Activity Logs</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {logs?.map((log) => (
            <Card key={log.id} className="p-4 flex items-center space-x-4">
              <Activity className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-gray-500">
                  {new Date(log.created_at).toLocaleString()}
                </p>
                {log.details && (
                  <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityLogs;