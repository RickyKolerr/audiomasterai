import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogIn, LogOut, AlertCircle, Check, X } from "lucide-react";
import { format } from "date-fns";

const AuthHistory = () => {
  const { data: authAttempts, isLoading } = useQuery({
    queryKey: ['auth-attempts'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from('auth_attempts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <p className="text-sm text-gray-500">Loading authentication history...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black/50 border border-green-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Recent Authentication Activity</h2>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {authAttempts?.map((attempt) => (
            <Card 
              key={attempt.id} 
              className="p-4 flex items-center space-x-4 bg-black/30 border border-green-500/10 hover:border-green-500/30 transition-colors"
            >
              {attempt.success ? (
                <div className="p-2 rounded-full bg-green-500/10">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-red-500/10">
                  <X className="h-5 w-5 text-red-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {attempt.attempt_type === 'signin' ? (
                    <LogIn className="h-4 w-4 text-gray-400" />
                  ) : attempt.attempt_type === 'signup' ? (
                    <LogOut className="h-4 w-4 text-gray-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <p className="font-medium text-white">
                    {attempt.attempt_type.charAt(0).toUpperCase() + attempt.attempt_type.slice(1)} Attempt
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {format(new Date(attempt.created_at), 'PPpp')}
                </p>
                {attempt.user_agent && (
                  <p className="text-xs text-gray-500 mt-1">
                    {attempt.user_agent}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default AuthHistory;