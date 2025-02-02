import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users, FileText, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardNav from "@/components/dashboard/DashboardNav"
import RecentActivity from "@/components/dashboard/RecentActivity"
import AnalyticsChart from "@/components/dashboard/AnalyticsChart"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, User!</h1>
          <p className="text-gray-400">Here's what's happening with your account today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: "Total Users", value: "1,234", icon: Users, trend: "+12.3%" },
            { title: "Active Projects", value: "23", icon: FileText, trend: "+4.5%" },
            { title: "Revenue", value: "$12,345", icon: DollarSign, trend: "+8.7%" },
            { title: "Subscriptions", value: "321", icon: CreditCard, trend: "+2.4%" },
          ].map((item, index) => (
            <Card key={index} className="bg-black/50 border border-green-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <p className="text-xs text-green-500">{item.trend} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="col-span-2 bg-black/50 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart />
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard