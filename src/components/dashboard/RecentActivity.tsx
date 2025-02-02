import { ScrollArea } from "@/components/ui/scroll-area"

const RecentActivity = () => {
  const activities = [
    { id: 1, action: "Project created", time: "2 minutes ago" },
    { id: 2, action: "File uploaded", time: "1 hour ago" },
    { id: 3, action: "New comment", time: "3 hours ago" },
    { id: 4, action: "Settings updated", time: "5 hours ago" },
    { id: 5, action: "Project shared", time: "1 day ago" },
  ]

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="text-sm text-white">{activity.action}</span>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default RecentActivity