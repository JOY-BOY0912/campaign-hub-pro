import { Megaphone } from "lucide-react";
import SummaryCards from "@/components/SummaryCards";
import CampaignControlPanel from "@/components/CampaignControlPanel";
import CampaignStatusTable from "@/components/CampaignStatusTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
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

        {/* Summary Cards */}
        <SummaryCards />

        {/* Campaign Control */}
        <CampaignControlPanel />

        {/* Campaign History */}
        <CampaignStatusTable />
      </div>
    </div>
  );
};

export default Index;
