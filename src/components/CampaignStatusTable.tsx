import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const campaigns = [
  {
    name: "Weekend Special Offer",
    segment: "VIP",
    status: "Completed",
    sent: 128,
    date: "2026-02-20",
  },
  {
    name: "Re-engagement Push",
    segment: "SLEEPING",
    status: "Running",
    sent: 89,
    date: "2026-02-21",
  },
  {
    name: "New Menu Launch",
    segment: "ACTIVE",
    status: "Completed",
    sent: 542,
    date: "2026-02-19",
  },
];

const CampaignStatusTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Sent</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{c.segment}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={c.status === "Running" ? "default" : "outline"}
                  >
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{c.sent}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {c.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignStatusTable;
