
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProgressTracker from "@/components/ProgressTracker";
import { Skeleton } from "@/components/ui/skeleton";

interface StudyProgressStats {
  totalMaterials: number;
  completedMaterials: number;
  totalTimeSpent: number;
  averageProgress: number;
}

const StudyDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["study-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch study progress stats
      const { data: progressData, error: progressError } = await supabase
        .from("study_progress")
        .select("progress_percentage, time_spent_seconds, completed_at")
        .eq("user_id", user.id);

      if (progressError) throw progressError;

      // Fetch total materials count
      const { count: totalMaterials } = await supabase
        .from("study_materials")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);

      const stats: StudyProgressStats = {
        totalMaterials: totalMaterials || 0,
        completedMaterials: progressData?.filter(p => p.completed_at)?.length || 0,
        totalTimeSpent: progressData?.reduce((acc, curr) => acc + (curr.time_spent_seconds || 0), 0) || 0,
        averageProgress: progressData?.reduce((acc, curr) => acc + curr.progress_percentage, 0) / (progressData?.length || 1) || 0,
      };

      return stats;
    },
  });

  const { data: recentMaterials, isLoading: materialsLoading } = useQuery({
    queryKey: ["recent-materials"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("study_materials")
        .select(`
          id,
          title,
          created_at,
          study_progress (
            progress_percentage,
            time_spent_seconds
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-8 w-8 mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
            </Card>
          ))
        ) : (
          <>
            <Card className="p-6">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Total Materials</p>
              <h3 className="text-2xl font-bold">{stats?.totalMaterials}</h3>
            </Card>
            <Card className="p-6">
              <Award className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">{stats?.completedMaterials}</h3>
            </Card>
            <Card className="p-6">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Study Time</p>
              <h3 className="text-2xl font-bold">{formatTime(stats?.totalTimeSpent || 0)}</h3>
            </Card>
            <Card className="p-6">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Average Progress</p>
              <h3 className="text-2xl font-bold">{Math.round(stats?.averageProgress || 0)}%</h3>
            </Card>
          </>
        )}
      </div>

      {/* Recent Materials with Progress */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Study Materials</h2>
        <div className="space-y-4">
          {materialsLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-3/4" />
              </div>
            ))
          ) : recentMaterials?.length === 0 ? (
            <p className="text-muted-foreground">No study materials yet</p>
          ) : (
            recentMaterials?.map((material) => (
              <div key={material.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{material.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(material.study_progress?.[0]?.time_spent_seconds || 0)}
                  </span>
                </div>
                <ProgressTracker
                  progress={material.study_progress?.[0]?.progress_percentage || 0}
                  status="In Progress"
                />
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudyDashboard;
