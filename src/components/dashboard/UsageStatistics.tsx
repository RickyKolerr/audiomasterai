import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Download, Clock } from "lucide-react";

const UsageStatistics = () => {
  const { data: stats } = useQuery({
    queryKey: ['usage-stats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('monthly_conversions_used, subscription_plan')
        .eq('id', session.user.id)
        .single();

      const { count: totalBooks } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      const { count: totalDownloads } = await supabase
        .from('downloads')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      return {
        conversionsUsed: profile?.monthly_conversions_used || 0,
        conversionLimit: profile?.subscription_plan === 'pro' ? 20 : 3,
        totalBooks: totalBooks || 0,
        totalDownloads: totalDownloads || 0,
      };
    },
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Monthly Conversions</h3>
          <Book className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          <Progress
            value={(stats?.conversionsUsed / (stats?.conversionLimit || 1)) * 100}
          />
          <p className="text-sm text-gray-500">
            {stats?.conversionsUsed} / {stats?.conversionLimit} used
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Total Books</h3>
          <Book className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-3xl font-bold">{stats?.totalBooks || 0}</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Total Downloads</h3>
          <Download className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-3xl font-bold">{stats?.totalDownloads || 0}</p>
      </Card>
    </div>
  );
};

export default UsageStatistics;