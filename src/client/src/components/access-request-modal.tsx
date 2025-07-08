import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asset } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { BarChart } from "lucide-react";

interface AccessRequestModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessRequestModal({
  asset,
  isOpen,
  onClose,
}: AccessRequestModalProps) {
  const [reason, setReason] = useState("");
  const [project, setProject] = useState("");
  const { toast } = useToast();

  if (!asset) return null;

  const projects = [
    "Select project or team",
    "Marketing Team",
    "Sales Analytics",
    "Product Development",
    "Executive Dashboard",
  ];

  const handleSubmit = () => {
    if (!reason.trim() || project === "Select project or team") {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Submitted!",
      description: "Your access request has been submitted successfully.",
    });

    setReason("");
    setProject("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Request Access
          </DialogTitle>
          <p className="text-slate-600 mt-1">
            Tell us why you need access to this asset
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Asset</Label>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg mt-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="text-blue-600 h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-slate-800">{asset.title}</div>
                <div className="text-sm text-slate-600">by {asset.creator}</div>
              </div>
            </div>
          </div>

          <div>
            <Label
              htmlFor="reason"
              className="text-sm font-medium text-slate-700"
            >
              Reason for Access
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why you need access to this asset and how you plan to use it..."
              className="mt-2 h-32 resize-none"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">
              Project/Team
            </Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select project or team" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj} value={proj}>
                    {proj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
