import { Users, Search, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export interface Customer {
  id: number;
  customer_name: string;
  phone: string;
  last_order_date: string;
  total_orders: number;
  total_spent: number;
  segment: string;
}

const segmentColors: Record<string, string> = {
  VIP: "bg-[hsl(var(--vip))] text-white",
  ACTIVE: "bg-[hsl(var(--active))] text-white",
  SLEEPING: "bg-[hsl(var(--sleeping))] text-black",
  LOST: "bg-[hsl(var(--lost))] text-white",
};

interface Props {
  customers: Customer[];
  loading: boolean;
  fetched: boolean;
  onFetch: () => void;
}

const CustomersDataViewer = ({ customers, loading, fetched, onFetch }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">Customers Data</CardTitle>
        </div>
        <Button onClick={onFetch} disabled={loading}>
          {loading ? (
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block" />
          ) : (
            <Database className="mr-2 h-4 w-4" />
          )}
          {loading ? "Loading…" : "Get Customers Data"}
        </Button>
      </CardHeader>

      {fetched && (
        <CardContent className="space-y-4 animate-in fade-in-0 duration-500">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-muted-foreground">
              Total customers:{" "}
              <span className="font-semibold text-foreground">
                {customers.length}
              </span>
            </p>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name or phone…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead className="text-right">Total Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Last Order Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.id}</TableCell>
                      <TableCell>{c.customer_name}</TableCell>
                      <TableCell className="font-mono text-xs">{c.phone}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            segmentColors[c.segment?.toUpperCase()] ??
                            "bg-muted text-muted-foreground"
                          }
                        >
                          {c.segment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{c.total_orders}</TableCell>
                      <TableCell className="text-right">
                        ₹{c.total_spent.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        {new Date(c.last_order_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CustomersDataViewer;
