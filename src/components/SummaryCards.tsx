import { Crown, Users, Moon, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const segments = [
  {
    name: "VIP Customers",
    count: 128,
    icon: Crown,
    colorClass: "text-vip",
    bgClass: "bg-vip/10",
    borderClass: "border-vip/20",
  },
  {
    name: "Active Customers",
    count: 542,
    icon: Users,
    colorClass: "text-active",
    bgClass: "bg-active/10",
    borderClass: "border-active/20",
  },
  {
    name: "Sleeping Customers",
    count: 213,
    icon: Moon,
    colorClass: "text-sleeping",
    bgClass: "bg-sleeping/10",
    borderClass: "border-sleeping/20",
  },
  {
    name: "Lost Customers",
    count: 87,
    icon: UserX,
    colorClass: "text-lost",
    bgClass: "bg-lost/10",
    borderClass: "border-lost/20",
  },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {segments.map((seg) => (
        <Card key={seg.name} className={`border ${seg.borderClass}`}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${seg.bgClass}`}>
              <seg.icon className={`h-5 w-5 ${seg.colorClass}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{seg.name}</p>
              <p className="text-2xl font-semibold">{seg.count.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
