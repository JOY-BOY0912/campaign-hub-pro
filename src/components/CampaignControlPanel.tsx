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

const templateMap: Record<string, string> = {
  VIP: "vip_customer_offer",
  ACTIVE: "active_customer_bonus",
  SLEEPING: "sleeping_customer_offer",
  LOST: "lost_customer_comeback",
};

export interface CampaignRecord {
  name: string;
  segment: string;
  template: string;
  status: string;
  sent: number;
  date: string;
}

interface Props {
  onCampaignSent: (record: CampaignRecord) => void;
}

const segmentCounts: Record<string, number> = {
  VIP: 128,
  ACTIVE: 542,
  SLEEPING: 213,
  LOST: 87,
};

const CampaignControlPanel = ({ onCampaignSent }: Props) => {
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const autoTemplate = segment ? templateMap[segment] : "";

  const handleSend = async () => {
    if (!campaignName || !segment) {
      toast({
        title: "Missing fields",
        description: "Please fill in campaign name and select a segment.",
        variant: "destructive",
      });
      return;
    }

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
            segment,
            template: autoTemplate,
            campaignName,
            campaignNotes: notes,
          }),
        }
      );
      if (!res.ok) throw new Error("Request failed");

      const record: CampaignRecord = {
        name: campaignName,
        segment,
        template: autoTemplate,
        status: "Running",
        sent: segmentCounts[segment] || 0,
        date: new Date().toISOString().split("T")[0],
      };
      onCampaignSent(record);

      toast({
        title: "Campaign started successfully 🚀",
        description: `"${campaignName}" sent to ${segment} segment.`,
      });

      setCampaignName("");
      setSegment("");
      setNotes("");
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
        </div>
        {autoTemplate && (
          <div className="text-sm text-muted-foreground">
            Template: <span className="font-medium text-foreground">{autoTemplate.replace(/_/g, " ")}</span> (auto-selected)
          </div>
        )}
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
