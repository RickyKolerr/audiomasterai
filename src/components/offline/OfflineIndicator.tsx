import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { Wifi, WifiOff } from "lucide-react";

const OfflineIndicator = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
      <WifiOff className="h-4 w-4" />
      <span>You're offline</span>
    </div>
  );
};

export default OfflineIndicator;