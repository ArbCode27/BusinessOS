import { Badge } from "@/components/ui/badge";
import type { Campaign, LeadStatus, OrderStatus } from "@/types/business";

type StatusBadgeProps = {
  status: OrderStatus | LeadStatus | Campaign["status"] | string;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variant =
    status.includes("Closed") || status.includes("Paid") || status.includes("Scaling") || status.includes("Resolved")
      ? "success"
      : status.includes("Risk") || status.includes("Human")
        ? "danger"
        : status.includes("Pending") || status.includes("Learning") || status.includes("Negotiation")
          ? "warning"
          : status.includes("Interested") || status.includes("Optimizing")
            ? "violet"
            : "default";

  return <Badge variant={variant}>{status}</Badge>;
};
