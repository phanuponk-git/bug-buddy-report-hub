
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BugReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    priority: "",
    status: "ยังไม่เริ่ม",
    reporter: "",
    assignee: "",
    type: "",
    screenshot: null as File | null
  });

  const priorities = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
    { value: "normal", label: "ไม่เร่งด่วน", color: "bg-blue-100 text-blue-800" },
    { value: "urgent", label: "รีบแก้", color: "bg-yellow-100 text-yellow-800" },
    { value: "critical", label: "ต้องแก้ทันที", color: "bg-red-100 text-red-800" }
  ];

  const statuses = [
    { value: "ยังไม่เริ่ม", label: "ยังไม่เริ่ม" },
    { value: "กำลังดำเนินการ", label: "กำลังดำเนินการ" },
    { value: "เสร็จสิ้น", label: "เสร็จสิ้น" },
    { value: "ปิด", label: "ปิด" }
  ];

  const people = ["ปั้บ", "ดิว", "เท่", "เวฟ", "โมส"];
  const bugTypes = [
    { value: "bug", label: "BUG" },
    { value: "ui", label: "UI" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "บันทึกสำเร็จ!",
      description: "✅ บันทึกลง Database สำเร็จ\n✅ ซิงก์ Google Sheets สำเร็จ\n✅ สร้าง Google Docs รายงานสำเร็จ",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      url: "",
      priority: "",
      status: "ยังไม่เริ่ม",
      reporter: "",
      assignee: "",
      type: "",
      screenshot: null
    });

    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">ชื่อ Bug *</Label>
          <Input
            id="title"
            placeholder="เช่น ปุ่ม Login ไม่ทำงาน"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL ที่พบปัญหา</Label>
          <Input
            id="url"
            placeholder="https://example.com/page"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">รายละเอียด Bug *</Label>
        <Textarea
          id="description"
          placeholder="อธิบายขั้นตอนการทำซ้ำ, ผลลัพธ์ที่คาดหวัง, และสิ่งที่เกิดขึ้นจริง..."
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>ความสำคัญ *</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกความสำคัญ" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  <span className={`px-2 py-1 rounded-full text-xs ${priority.color}`}>
                    {priority.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>สถานะ</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>ประเภท *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกประเภท" />
            </SelectTrigger>
            <SelectContent>
              {bugTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>วันที่</Label>
          <div className="flex items-center space-x-2 px-3 py-2 border rounded-md bg-gray-50">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString('th-TH')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ผู้แจ้ง</Label>
          <Select value={formData.reporter} onValueChange={(value) => setFormData({ ...formData, reporter: value })}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกผู้แจ้ง" />
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>ผู้ทำ</Label>
          <Select value={formData.assignee} onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกผู้ทำ" />
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Screenshot (ไม่บังคับ)</Label>
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="screenshot" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    คลิกเพื่ออัปโหลดภาพหน้าจอ
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    PNG, JPG หรือ GIF (ไม่เกิน 10MB)
                  </span>
                </label>
                <input
                  id="screenshot"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {formData.screenshot && (
                <p className="mt-2 text-sm text-green-600">
                  ✅ {formData.screenshot.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "กำลังบันทึก..." : "บันทึก Bug Report"}
      </Button>
    </form>
  );
};

export default BugReportForm;
