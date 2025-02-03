import { Card } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users, FileText, Settings } from "lucide-react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import UsageStatistics from "@/components/dashboard/UsageStatistics";
import ActivityLogs from "@/components/dashboard/ActivityLogs";
import DownloadHistory from "@/components/downloads/DownloadHistory";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { useSubscription } from "@/hooks/useSubscription";

const Dashboard = () => {
  const { subscription } = useSubscription();

  return (
    <div className="min-h-screen bg-black">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">
            Current Plan: {subscription.plan?.charAt(0).toUpperCase() + subscription.plan?.slice(1) || "Free"}
          </p>
        </div>

        <div className="space-y-8">
          <UsageStatistics />
          
          <div className="grid md:grid-cols-2 gap-8">
            <ActivityLogs />
            <DownloadHistory />
          </div>

          <Card className="p-6 bg-black/50 border border-green-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Subscription Plans</h2>
            <SubscriptionPlans />
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              { title: "Total Users", value: "1,234", icon: Users, trend: "+12.3%" },
              { title: "Active Projects", value: "23", icon: FileText, trend: "+4.5%" },
              { title: "Revenue", value: "$12,345", icon: DollarSign, trend: "+8.7%" },
              { title: "Subscriptions", value: "321", icon: CreditCard, trend: "+2.4%" },
            ].map((item, index) => (
              <Card key={index} className="bg-black/50 border border-green-500/20">
                <div className="p-6">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-400">{item.title}</h3>
                    <item.icon className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <p className="text-xs text-green-500">{item.trend} from last month</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 bg-black/50 border border-green-500/20">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Analytics Overview</h2>
                <AnalyticsChart />
              </div>
            </Card>

            <Card className="bg-black/50 border border-green-500/20">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                <RecentActivity />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;