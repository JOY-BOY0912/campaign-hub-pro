import { useState } from "react";
import { Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const segments = ["VIP", "ACTIVE", "SLEEPING", "LOST"];
const templates = [
  "vip_customer_offer",
  "active_customer_bonus",
  "sleeping_customer_offer",
  "lost_customer_comeback",
];

const CampaignControlPanel = () => {
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState("");
  const [template, setTemplate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://n8n.srv1302157.hstgr.cloud/webhook/send-campain",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trigger: "manual_campaign",
            source: "loveable_dashboard",
          }),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      toast({
        title: "Campaign started successfully 🚀",
        description: `"${campaignName || "Untitled"}" sent to ${segment || "all"} segment.`,
      });
    } catch {
      toast({
        title: "Failed to start campaign",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Control Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="e.g. Weekend Special Offer"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Select Segment</Label>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Choose segment" />
              </SelectTrigger>
              <SelectContent>
                {segments.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Select Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Campaign Notes</Label>
          <Textarea
            placeholder="Add any notes about this campaign..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
        <Button
          size="lg"
          className="w-full md:w-auto"
          onClick={handleSend}
          disabled={loading}
        >
          <Rocket className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Send Campaign"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignControlPanel;
