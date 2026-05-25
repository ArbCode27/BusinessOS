import {
  BarChart3,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  Gauge,
  Megaphone,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow
} from "lucide-react";

export const appNavigation = [
  { title: "Command Center", href: "/dashboard", icon: Gauge },
  { title: "CRM Pipeline", href: "/dashboard/crm", icon: Workflow },
  { title: "Ecommerce", href: "/dashboard/ecommerce", icon: Boxes },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { title: "Products", href: "/dashboard/products", icon: Package },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
  { title: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
  { title: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/settings", icon: Settings }
];

export const productHighlights = [
  {
    title: "AI revenue operator",
    detail: "Recovers carts, answers support and recommends next-best actions.",
    icon: Sparkles
  },
  {
    title: "Unified data model",
    detail: "CRM, orders, products and campaigns share one operating layer.",
    icon: ChartNoAxesCombined
  }
];
