export type OrderStatus = "Paid" | "Pending" | "Fulfilled" | "Refunded" | "Risk";

export type LeadStatus =
  | "New Lead"
  | "Contacted"
  | "Interested"
  | "Negotiation"
  | "Closed";

export type CustomerSegment = "VIP" | "Growth" | "At Risk" | "New" | "Loyal";

export type CampaignChannel = "Meta Ads" | "TikTok" | "Email" | "WhatsApp";

export type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  detail: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  segment: CustomerSegment;
  lifetimeValue: number;
  orders: number;
  health: number;
  city: string;
  lastSeen: string;
  tags: string[];
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  conversion: number;
  variants: string[];
};

export type Order = {
  id: string;
  customer: Customer;
  product: Product;
  amount: number;
  status: OrderStatus;
  date: string;
  paymentMethod: "Visa" | "Mastercard" | "Amex" | "PayPal" | "Apple Pay";
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  value: number;
  status: LeadStatus;
  tags: string[];
  notes: string;
  timeline: string[];
};

export type Campaign = {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: "Scaling" | "Learning" | "Paused" | "Optimizing";
  ctr: number;
  cpc: number;
  conversions: number;
  roi: number;
  reach: number;
  spend: number;
};

export type Conversation = {
  id: string;
  customer: string;
  channel: "Website" | "WhatsApp" | "Instagram" | "Email";
  status: "AI Resolved" | "Human Needed" | "Recovering Cart";
  messages: {
    role: "user" | "assistant";
    content: string;
    time: string;
  }[];
};

export type ChartPoint = {
  name: string;
  revenue?: number;
  orders?: number;
  customers?: number;
  conversion?: number;
  ai?: number;
  value?: number;
};
