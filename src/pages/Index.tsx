import { useState, useMemo } from "react";
import { Megaphone } from "lucide-react";
import SummaryCards from "@/components/SummaryCards";
import CampaignControlPanel from "@/components/CampaignControlPanel";
import type { CampaignRecord } from "@/components/CampaignControlPanel";
import CampaignStatusTable from "@/components/CampaignStatusTable";
import CustomersDataViewer, { type Customer } from "@/components/CustomersDataViewer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { toast } = useToast();

  const segmentCounts = useMemo(() => {
    const counts = { VIP: 0, ACTIVE: 0, SLEEPING: 0, LOST: 0 };
    customers.forEach((c) => {
      const key = c.segment?.toUpperCase() as keyof typeof counts;
      if (key in counts) counts[key]++;
    });
    return counts;
  }, [customers]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://n8n.srv1302157.hstgr.cloud/webhook/customers-campagin"
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Customer[] = await res.json();
      setCustomers(data);
      setFetched(true);
      toast({ title: "Customers loaded successfully ✅" });
    } catch {
      toast({ title: "Failed to load customers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
        <SummaryCards counts={segmentCounts} />
        <CampaignControlPanel onCampaignSent={handleCampaignSent} />
        <CampaignStatusTable campaigns={campaigns} />
        <CustomersDataViewer
          customers={customers}
          loading={loading}
          fetched={fetched}
          onFetch={fetchCustomers}
        />
      </div>
    </div>
  );
};

export default Index;
