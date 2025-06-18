
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, ExternalLink, Search, Filter } from "lucide-react";

// Mock data
const mockBugs = [
  {
    id: 1,
    title: "ปุ่ม Login ไม่ทำงาน",
    description: "เมื่อกดปุ่ม Login แล้วไม่มีอะไรเกิดขึ้น",
    url: "https://example.com/login",
    priority: "critical",
    status: "ยังไม่เริ่ม",
    reporter: "ปั้บ",
    assignee: "ดิว",
    type: "BUG",
    date: "2024-01-15",
    googleDoc: "https://docs.google.com/document/d/1"
  },
  {
    id: 2,
    title: "สีปุ่มไม่ตรงตาม Design",
    description: "ปุ่ม Submit ควรเป็นสีน้ำเงิน แต่แสดงเป็นสีเทา",
    url: "https://example.com/form",
    priority: "normal",
    status: "กำลังดำเนินการ",
    reporter: "เวฟ",
    assignee: "เท่",
    type: "UI",
    date: "2024-01-14",
    googleDoc: "https://docs.google.com/document/d/2"
  },
  {
    id: 3,
    title: "หน้าเว็บโหลดช้า",
    description: "หน้า Dashboard ใช้เวลาโหลดมากกว่า 10 วินาที",
    url: "https://example.com/dashboard",
    priority: "urgent",
    status: "เสร็จสิ้น",
    reporter: "โมส",
    assignee: "ปั้บ",
    type: "BUG",
    date: "2024-01-13",
    googleDoc: "https://docs.google.com/document/d/3"
  }
];

const BugDashboard = () => {
  const [bugs, setBugs] = useState(mockBugs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800";
      case "normal": return "bg-blue-100 text-blue-800";
      case "urgent": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ยังไม่เริ่ม": return "bg-gray-100 text-gray-800";
      case "กำลังดำเนินการ": return "bg-blue-100 text-blue-800";
      case "เสร็จสิ้น": return "bg-green-100 text-green-800";
      case "ปิด": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bug.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || bug.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = (id: number) => {
    setBugs(bugs.filter(bug => bug.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>รายการ Bug ทั้งหมด</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Google Sheets
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหา Bug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกสถานะ</SelectItem>
              <SelectItem value="ยังไม่เริ่ม">ยังไม่เริ่ม</SelectItem>
              <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
              <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
              <SelectItem value="ปิด">ปิด</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="ความสำคัญ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกระดับ</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">ไม่เร่งด่วน</SelectItem>
              <SelectItem value="urgent">รีบแก้</SelectItem>
              <SelectItem value="critical">ต้องแก้ทันที</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bug</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>ความสำคัญ</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>ผู้แจ้ง</TableHead>
                <TableHead>ผู้ทำ</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBugs.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{bug.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {bug.description}
                      </div>
                      {bug.url && (
                        <a href={bug.url} target="_blank" rel="noopener noreferrer" 
                           className="text-xs text-blue-500 hover:underline">
                          {bug.url}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{bug.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(bug.priority)}>
                      {bug.priority === "critical" ? "ต้องแก้ทันที" : 
                       bug.priority === "urgent" ? "รีบแก้" :
                       bug.priority === "normal" ? "ไม่เร่งด่วน" : "Low"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bug.status)}>
                      {bug.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{bug.reporter}</TableCell>
                  <TableCell>{bug.assignee}</TableCell>
                  <TableCell>{bug.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(bug.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={bug.googleDoc} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredBugs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบ Bug ที่ตรงกับเงื่อนไขการค้นหา
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BugDashboard;
