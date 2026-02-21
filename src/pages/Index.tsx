import { useState } from "react";
import { Megaphone } from "lucide-react";
import SummaryCards from "@/components/SummaryCards";
import CampaignControlPanel from "@/components/CampaignControlPanel";
import type { CampaignRecord } from "@/components/CampaignControlPanel";
import CampaignStatusTable from "@/components/CampaignStatusTable";

const Index = () => {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);

  const handleCampaignSent = (record: CampaignRecord) => {
    setCampaigns((prev) => [record, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Megaphone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Marketing Campaign Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Send WhatsApp campaigns to your customer segments
            </p>
          </div>
        </div>
        <SummaryCards />
        <CampaignControlPanel onCampaignSent={handleCampaignSent} />
        <CampaignStatusTable campaigns={campaigns} />
      </div>
    </div>
  );
};

export default Index;
