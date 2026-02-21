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
import type { CampaignRecord } from "@/components/CampaignControlPanel";

interface Props {
  campaigns: CampaignRecord[];
}

const CampaignStatusTable = ({ campaigns }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign History</CardTitle>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No campaigns sent yet. Send your first campaign above.
          </p>
        ) : (
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
              {campaigns.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{c.segment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Running" ? "default" : "outline"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{c.sent}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{c.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignStatusTable;
