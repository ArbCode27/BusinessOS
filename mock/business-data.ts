import { faker } from "@faker-js/faker";
import type {
  Campaign,
  ChartPoint,
  Conversation,
  Customer,
  Lead,
  LeadStatus,
  Metric,
  Order,
  OrderStatus,
  Product
} from "@/types/business";

faker.seed(42);

const productImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop"
];

export const customers: Customer[] = Array.from({ length: 28 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
  company: faker.company.name(),
  avatar: `https://i.pravatar.cc/160?img=${index + 12}`,
  segment: faker.helpers.arrayElement(["VIP", "Growth", "At Risk", "New", "Loyal"]),
  lifetimeValue: faker.number.int({ min: 1200, max: 82000 }),
  orders: faker.number.int({ min: 2, max: 96 }),
  health: faker.number.int({ min: 42, max: 99 }),
  city: faker.location.city(),
  lastSeen: faker.date.recent({ days: 14 }).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  }),
  tags: faker.helpers.arrayElements(["B2B", "Wholesale", "Repeat buyer", "High intent", "AI assisted"], {
    min: 2,
    max: 3
  })
}));

export const products: Product[] = Array.from({ length: 18 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  category: faker.helpers.arrayElement(["Wellness", "Electronics", "Home", "Fashion", "Beauty", "Office"]),
  image: productImages[index % productImages.length],
  price: Number(faker.commerce.price({ min: 29, max: 1200 })),
  stock: faker.number.int({ min: 8, max: 540 }),
  sales: faker.number.int({ min: 42, max: 5200 }),
  rating: faker.number.float({ min: 4.1, max: 5, fractionDigits: 1 }),
  conversion: faker.number.float({ min: 2.8, max: 14.7, fractionDigits: 1 }),
  variants: faker.helpers.arrayElements(["Black", "White", "Gold", "Pro", "Starter", "Enterprise"], {
    min: 2,
    max: 4
  })
}));

export const orders: Order[] = Array.from({ length: 80 }, (_, index) => {
  const product = products[index % products.length];
  const customer = customers[index % customers.length];

  return {
    id: `BOS-${faker.number.int({ min: 10000, max: 99999 })}`,
    customer,
    product,
    amount: product.price * faker.number.int({ min: 1, max: 5 }),
    status: faker.helpers.arrayElement<OrderStatus>(["Paid", "Pending", "Fulfilled", "Refunded", "Risk"]),
    date: faker.date.recent({ days: 45 }).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    paymentMethod: faker.helpers.arrayElement(["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"])
  };
});

const leadStatuses: LeadStatus[] = ["New Lead", "Contacted", "Interested", "Negotiation", "Closed"];

export const leads: Lead[] = Array.from({ length: 25 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
  company: faker.company.name(),
  avatar: `https://i.pravatar.cc/160?img=${index + 35}`,
  value: faker.number.int({ min: 2400, max: 128000 }),
  status: leadStatuses[index % leadStatuses.length],
  tags: faker.helpers.arrayElements(["Hot", "Enterprise", "Referral", "Demo booked", "AI scored"], {
    min: 2,
    max: 3
  }),
  notes: faker.company.catchPhrase(),
  timeline: [
    "AI scored the lead as high intent",
    "Viewed pricing page twice",
    "Requested ecommerce automation demo",
    "Opened revenue forecast email"
  ]
}));

export const campaigns: Campaign[] = [
  "Meta Ads",
  "TikTok",
  "Email",
  "WhatsApp",
  "Meta Ads",
  "Email",
  "TikTok",
  "WhatsApp"
].map((channel) => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement([
    "Cart Recovery Engine",
    "VIP Winback Sequence",
    "Product Launch Sprint",
    "Founder Story Retargeting",
    "Holiday Revenue Push",
    "AI Concierge Activation"
  ]),
  channel: channel as Campaign["channel"],
  status: faker.helpers.arrayElement(["Scaling", "Learning", "Paused", "Optimizing"]),
  ctr: faker.number.float({ min: 1.2, max: 8.8, fractionDigits: 1 }),
  cpc: faker.number.float({ min: 0.34, max: 4.4, fractionDigits: 2 }),
  conversions: faker.number.int({ min: 42, max: 2200 }),
  roi: faker.number.float({ min: 1.8, max: 9.6, fractionDigits: 1 }),
  reach: faker.number.int({ min: 18000, max: 880000 }),
  spend: faker.number.int({ min: 1200, max: 46000 })
}));

export const conversations: Conversation[] = Array.from({ length: 8 }, (_, index) => ({
  id: faker.string.uuid(),
  customer: customers[index].name,
  channel: faker.helpers.arrayElement(["Website", "WhatsApp", "Instagram", "Email"]),
  status: faker.helpers.arrayElement(["AI Resolved", "Human Needed", "Recovering Cart"]),
  messages: [
    {
      role: "user",
      content: "I need help tracking my order and choosing the right add-on.",
      time: "09:41"
    },
    {
      role: "assistant",
      content:
        "I found your order, it is already fulfilled. Based on your purchase history, the Pro bundle has the highest repeat-purchase fit.",
      time: "09:42"
    }
  ]
}));

export const executiveMetrics: Metric[] = [
  { label: "Total revenue", value: 1284300, prefix: "$", trend: 18.4, detail: "vs. previous month" },
  { label: "Today's sales", value: 48240, prefix: "$", trend: 11.7, detail: "AI recovered $8.4k" },
  { label: "Active customers", value: 18420, trend: 7.9, detail: "2,180 AI assisted" },
  { label: "Conversion rate", value: 8.6, suffix: "%", trend: 3.2, detail: "highest in 90 days" }
];

export const revenueSeries: ChartPoint[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
  (name, index) => ({
    name,
    revenue: 82000 + index * 22000 + faker.number.int({ min: 4000, max: 26000 }),
    orders: 420 + index * 80 + faker.number.int({ min: 20, max: 120 }),
    customers: 900 + index * 170 + faker.number.int({ min: 30, max: 180 }),
    conversion: 4.2 + index * 0.56,
    ai: 35 + index * 7
  })
);

export const channelSeries = [
  { name: "Organic", value: 36 },
  { name: "Meta", value: 24 },
  { name: "TikTok", value: 17 },
  { name: "Email", value: 14 },
  { name: "WhatsApp", value: 9 }
];

export const activityFeed = [
  "AI recovered a $1,240 abandoned cart from WhatsApp.",
  "VIP segment crossed $420k lifetime value this quarter.",
  "Meta retargeting campaign moved into scaling mode.",
  "New enterprise lead requested an automation demo.",
  "Inventory alert: 3 top products are below reorder threshold."
];
