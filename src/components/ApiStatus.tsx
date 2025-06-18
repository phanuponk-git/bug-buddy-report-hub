
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

const ApiStatus = () => {
  // Mock API status - ในความเป็นจริงจะต้องเช็คจาก API จริง
  const apiStatuses = [
    { name: "Google Sheets", status: "connected", icon: CheckCircle, color: "text-green-500" },
    { name: "Google Docs", status: "warning", icon: AlertCircle, color: "text-yellow-500" },
    { name: "PostgreSQL", status: "connected", icon: CheckCircle, color: "text-green-500" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "เชื่อมต่อแล้ว";
      case "warning":
        return "แจ้งเตือน";
      case "error":
        return "ไม่พร้อมใช้งาน";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">API Status:</span>
      <div className="flex items-center space-x-2">
        {apiStatuses.map((api) => {
          const IconComponent = api.icon;
          return (
            <div key={api.name} className="flex items-center space-x-1">
              <IconComponent className={`w-4 h-4 ${api.color}`} />
              <Badge variant="outline" className={getStatusBadge(api.status)}>
                {api.name}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiStatus;
