"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CreditCard,
  Filter,
  PackageCheck,
  Plus,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ChannelDonutChart, GrowthLineChart, PerformanceBarChart, RevenueAreaChart } from "@/components/charts/premium-charts";
import { MetricCard } from "@/components/shared/metric-card";
import { MotionPage, StaggerGrid, StaggerItem } from "@/components/shared/motion-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { activityFeed, campaigns, channelSeries, customers, executiveMetrics, orders, products, revenueSeries } from "@/mock/business-data";
import { useAiChatStore, useCrmStore } from "@/store/app-store";
import type { Campaign, Customer, Lead, LeadStatus, Order, Product } from "@/types/business";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

const sectionCard = "border-white/10 bg-white/[0.045] backdrop-blur-2xl";
const leadStatuses: LeadStatus[] = ["New Lead", "Contacted", "Interested", "Negotiation", "Closed"];

const QuickStat = ({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Sparkles }) => (
  <Card className={cn(sectionCard, "p-5")}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      </div>
      <span className="rounded-2xl bg-white/10 p-3 text-sky-300">
        <Icon className="size-5" />
      </span>
    </div>
  </Card>
);

export const DashboardOverview = () => (
  <MotionPage>
    <PageHeader
      eyebrow="Executive command center"
      title="Revenue, customers and AI operations in one live cockpit."
      description="A high-signal operating dashboard that blends commerce, CRM, marketing and support automation into one investor-ready experience."
    >
      <Button size="lg">
        <Sparkles className="size-4" />
        Generate AI brief
      </Button>
    </PageHeader>

    <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {executiveMetrics.map((metric) => (
        <StaggerItem key={metric.label}>
          <MetricCard metric={metric} />
        </StaggerItem>
      ))}
    </StaggerGrid>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
      <Card className={sectionCard}>
        <CardHeader>
          <CardTitle>Revenue intelligence</CardTitle>
          <CardDescription>Animated revenue trajectory with order velocity and conversion lift.</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueAreaChart data={revenueSeries} />
        </CardContent>
      </Card>

      <Card className={sectionCard}>
        <CardHeader>
          <CardTitle>Sales by channel</CardTitle>
          <CardDescription>Unified attribution from all growth loops.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChannelDonutChart data={channelSeries} />
          <div className="grid grid-cols-2 gap-3">
            {channelSeries.map((channel) => (
              <div key={channel.name} className="rounded-2xl bg-white/[0.04] p-3">
                <p className="text-sm text-slate-400">{channel.name}</p>
                <p className="text-xl font-semibold text-white">{channel.value}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-3">
      <Card className={cn(sectionCard, "xl:col-span-2")}>
        <CardHeader>
          <CardTitle>Recent high-value orders</CardTitle>
          <CardDescription>Live commerce activity with payment and fulfillment signals.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.slice(0, 6).map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                    <AvatarFallback>{order.customer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{order.customer.name}</p>
                    <p className="text-sm text-slate-500">{order.product.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(order.amount)}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={sectionCard}>
        <CardHeader>
          <CardTitle>Live activity feed</CardTitle>
          <CardDescription>AI and revenue events streaming across the business.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityFeed.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-2xl bg-white/[0.04] p-4 pl-10 text-sm leading-6 text-slate-300"
              >
                <span className="absolute left-4 top-5 size-2 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/50" />
                {item}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </MotionPage>
);

const LeadCard = ({ lead }: { lead: Lead }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        draggable
        onDragStart={(event) => event.dataTransfer.setData("leadId", lead.id)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-left transition hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/[0.06]"
      >
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={lead.avatar} alt={lead.name} />
            <AvatarFallback>{lead.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{lead.name}</p>
            <p className="text-xs text-slate-500">{lead.company}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-white">{formatCurrency(lead.value, true)}</span>
          <Badge variant="violet">AI scored</Badge>
        </div>
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{lead.name}</DialogTitle>
        <DialogDescription>
          {lead.company} · {lead.email} · {lead.phone}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <Card className="bg-white/[0.04] p-4">
          <p className="text-sm text-slate-500">Potential value</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(lead.value)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {lead.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
        <div className="space-y-3">
          {lead.timeline.map((event) => (
            <div key={event} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
              {event}
            </div>
          ))}
        </div>
      </div>
      <Textarea defaultValue={lead.notes} aria-label="Lead notes" />
    </DialogContent>
  </Dialog>
);

export const CrmPage = () => {
  const { leads, moveLead } = useCrmStore();

  return (
    <MotionPage>
      <PageHeader
        eyebrow="CRM pipeline"
        title="HubSpot-style pipeline with AI-scored opportunities."
        description="Drag leads across stages, open detail modals and inspect timeline, notes, tags and deal potential."
      >
        <Button>
          <Plus className="size-4" />
          New lead
        </Button>
      </PageHeader>
      <div className="grid gap-4 overflow-x-auto pb-4 xl:grid-cols-5">
        {leadStatuses.map((status) => {
          const columnLeads = leads.filter((lead) => lead.status === status);

          return (
            <div
              key={status}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const leadId = event.dataTransfer.getData("leadId");
                moveLead(leadId, status);
                toast.success(`Lead moved to ${status}`);
              }}
              className="min-h-[620px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-white">{status}</h2>
                <Badge variant="outline">{columnLeads.length}</Badge>
              </div>
              <div className="space-y-3">
                {columnLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MotionPage>
  );
};

const ProductTile = ({ product }: { product: Product }) => (
  <Card className={cn(sectionCard, "group overflow-hidden")}>
    <div className="relative h-48 overflow-hidden">
      <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      <Badge className="absolute left-4 top-4">{product.category}</Badge>
    </div>
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.variants.join(" · ")}</p>
        </div>
        <p className="font-semibold text-white">{formatCurrency(product.price)}</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-white/[0.04] p-3">
          <Star className="mx-auto mb-1 size-4 text-amber-300" />
          <p className="text-sm text-white">{product.rating}</p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3">
          <ShoppingBag className="mx-auto mb-1 size-4 text-sky-300" />
          <p className="text-sm text-white">{formatNumber(product.sales)}</p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3">
          <PackageCheck className="mx-auto mb-1 size-4 text-emerald-300" />
          <p className="text-sm text-white">{product.stock}</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">Conversion</span>
          <span className="text-white">{product.conversion}%</span>
        </div>
        <Progress value={product.conversion * 6} />
      </div>
    </CardContent>
  </Card>
);

export const EcommercePage = () => {
  const [query, setQuery] = useState("");
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <MotionPage>
      <PageHeader
        eyebrow="Ecommerce manager"
        title="Shopify-grade product intelligence with premium merchandising."
        description="Search catalog, inspect inventory, conversion, variants and quick analytics from polished product cards."
      />
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <Input className="pl-10" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <Button variant="outline">
          <Filter className="size-4" />
          Filters
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.slice(0, 12).map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </MotionPage>
  );
};

export const ProductsPage = () => (
  <MotionPage>
    <PageHeader
      eyebrow="Product analytics"
      title="Top products, stock signals and conversion insights."
      description="A focused merchandising command surface for inventory, variants, pricing and sales momentum."
    >
      <Button>
        <Plus className="size-4" />
        Add product
      </Button>
    </PageHeader>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  </MotionPage>
);

const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => <span className="font-medium text-white">{row.original.id}</span>
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.customer.avatar} alt={row.original.customer.name} />
          <AvatarFallback>{row.original.customer.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span>{row.original.customer.name}</span>
      </div>
    )
  },
  {
    accessorKey: "product.name",
    header: "Product"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount)
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2">
        <CreditCard className="size-4 text-slate-500" />
        {row.original.paymentMethod}
      </span>
    )
  },
  {
    accessorKey: "date",
    header: "Date"
  }
];

export const OrdersPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <MotionPage>
      <PageHeader
        eyebrow="Orders"
        title="Advanced order operations with TanStack Table."
        description="Search, filter, paginate and inspect payment state across a realistic mock order stream."
      />
      <Card className={sectionCard}>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Order stream</CardTitle>
            <CardDescription>Mocked commerce orders with live-style state badges.</CardDescription>
          </div>
          <Input
            className="max-w-sm"
            placeholder="Search orders..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionPage>
  );
};

const CustomerCard = ({ customer }: { customer: Customer }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-left transition hover:-translate-y-1 hover:border-sky-300/30">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-white">{customer.name}</h3>
            <p className="text-sm text-slate-500">{customer.company}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">LTV</p>
            <p className="font-semibold text-white">{formatCurrency(customer.lifetimeValue, true)}</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">Orders</p>
            <p className="font-semibold text-white">{customer.orders}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-500">Health</span>
            <span className="text-white">{customer.health}%</span>
          </div>
          <Progress value={customer.health} />
        </div>
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{customer.name}</DialogTitle>
        <DialogDescription>
          {customer.email} · {customer.city} · {customer.segment}
        </DialogDescription>
      </DialogHeader>
      <GrowthLineChart data={revenueSeries} />
      <div className="grid gap-3 md:grid-cols-3">
        {["Purchased Pro bundle", "AI support resolved ticket", "Added to VIP winback"].map((item) => (
          <div key={item} className="rounded-2xl bg-white/[0.04] p-3 text-sm text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export const CustomersPage = () => (
  <MotionPage>
    <PageHeader
      eyebrow="Customer intelligence"
      title="Customer profiles, segmentation and lifecycle health."
      description="Profile cards show LTV, purchase behavior, tags, health score and a customer-specific activity timeline."
    />
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <QuickStat label="VIP customers" value="2,431" icon={Users} />
      <QuickStat label="Avg. LTV" value="$18.4k" icon={ArrowUpRight} />
      <QuickStat label="At-risk saved" value="428" icon={ShieldCheck} />
    </div>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {customers.slice(0, 15).map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  </MotionPage>
);

const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
  <Card className={sectionCard}>
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle>{campaign.name}</CardTitle>
          <CardDescription>{campaign.channel}</CardDescription>
        </div>
        <StatusBadge status={campaign.status} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        <QuickStat label="CTR" value={`${campaign.ctr}%`} icon={Zap} />
        <QuickStat label="CPC" value={`$${campaign.cpc}`} icon={CreditCard} />
        <QuickStat label="ROI" value={`${campaign.roi}x`} icon={ArrowUpRight} />
        <QuickStat label="Reach" value={formatNumber(campaign.reach)} icon={Users} />
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">Conversion progress</span>
          <span className="text-white">{campaign.conversions}</span>
        </div>
        <Progress value={Math.min(campaign.roi * 10, 100)} />
      </div>
    </CardContent>
  </Card>
);

export const MarketingPage = () => (
  <MotionPage>
    <PageHeader
      eyebrow="Marketing automation"
      title="Campaign performance across Meta, TikTok, Email and WhatsApp."
      description="Track ROI, CTR, CPC, reach and conversion momentum with campaign cards and analytics overlays."
    />
    <div className="mb-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className={sectionCard}>
        <CardHeader>
          <CardTitle>Conversion momentum</CardTitle>
          <CardDescription>Orders and AI-assisted conversions across campaign cycles.</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceBarChart data={revenueSeries} />
        </CardContent>
      </Card>
      <Card className={sectionCard}>
        <CardHeader>
          <CardTitle>Channel mix</CardTitle>
          <CardDescription>Paid, owned and conversational growth loops.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChannelDonutChart data={channelSeries} />
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  </MotionPage>
);

export const AiAssistantPage = () => {
  const { conversations: chatConversations, activeConversationId, sendMessage } = useAiChatStore();
  const [message, setMessage] = useState("");
  const activeConversation = chatConversations.find((conversation) => conversation.id === activeConversationId) ?? chatConversations[0];

  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }

    sendMessage(message);
    setMessage("");
    toast.success("AI workflow simulated");
  };

  return (
    <MotionPage>
      <PageHeader
        eyebrow="AI assistant"
        title="The WOW factor: AI support, revenue recovery and operations copilot."
        description="A ChatGPT/Intercom-inspired assistant that simulates order lookups, smart recommendations, cart recovery and n8n-style automations."
      />
      <div className="grid min-h-[720px] gap-6 xl:grid-cols-[360px_1fr]">
        <Card className={cn(sectionCard, "p-3")}>
          <div className="mb-4 rounded-3xl bg-gradient-to-br from-sky-400/20 to-violet-500/20 p-5">
            <Bot className="mb-4 size-7 text-sky-200" />
            <p className="font-semibold text-white">BusinessOS AI</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">Connected to mock CRM, orders, campaigns and product catalog.</p>
          </div>
          <ScrollArea className="h-[540px]">
            <div className="space-y-2 pr-3">
              {chatConversations.map((conversation) => (
                <button key={conversation.id} className="w-full rounded-2xl bg-white/[0.04] p-4 text-left transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{conversation.customer}</p>
                    <StatusBadge status={conversation.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{conversation.channel}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className={cn(sectionCard, "flex flex-col overflow-hidden")}>
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{activeConversation.customer}</CardTitle>
                <CardDescription>AI agent is analyzing orders, intent and retention signals.</CardDescription>
              </div>
              <Badge variant="success">Typing simulation ready</Badge>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-5 pr-4">
              {activeConversation.messages.map((chatMessage, index) => (
                <div key={`${chatMessage.time}-${index}`} className={cn("flex", chatMessage.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[78%] rounded-3xl px-5 py-4 text-sm leading-6",
                      chatMessage.role === "user" ? "bg-sky-400 text-slate-950" : "bg-white/[0.06] text-slate-200"
                    )}
                  >
                    {chatMessage.content}
                  </div>
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-slate-400"
              >
                <span className="size-2 animate-pulse rounded-full bg-sky-300" />
                AI can trigger WhatsApp recovery, order lookup and product recommendation.
              </motion.div>
            </div>
          </ScrollArea>
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {["Where is this order?", "Recover abandoned cart", "Recommend next product"].map((prompt) => (
                <Button key={prompt} variant="outline" size="sm" onClick={() => setMessage(prompt)}>
                  {prompt}
                </Button>
              ))}
            </div>
            <div className="flex gap-3">
              <Input
                aria-label="Message AI assistant"
                placeholder="Ask BusinessOS AI..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button aria-label="Send message" onClick={handleSendMessage}>
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MotionPage>
  );
};

export const AnalyticsPage = () => {
  const heatmap = useMemo(() => Array.from({ length: 35 }, (_, index) => 18 + ((index * 17) % 80)), []);

  return (
    <MotionPage>
      <PageHeader
        eyebrow="Enterprise analytics"
        title="Revenue analytics, retention, funnel health and AI performance."
        description="A dense executive analytics suite with complex charts, fake heatmaps, retention signals and channel intelligence."
      />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <Card className={sectionCard}>
          <CardHeader>
            <CardTitle>Revenue analytics</CardTitle>
            <CardDescription>Revenue expansion, customer growth and AI-assisted lift.</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueAreaChart data={revenueSeries} />
          </CardContent>
        </Card>
        <Card className={sectionCard}>
          <CardHeader>
            <CardTitle>Retention heatmap</CardTitle>
            <CardDescription>Fake cohort intensity over customer lifecycle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {heatmap.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="aspect-square rounded-lg border border-white/5"
                  style={{ backgroundColor: `rgba(56, 189, 248, ${value / 100})` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={sectionCard}>
          <CardHeader>
            <CardTitle>Customer growth and funnel</CardTitle>
            <CardDescription>Growth and conversion trend line.</CardDescription>
          </CardHeader>
          <CardContent>
            <GrowthLineChart data={revenueSeries} />
          </CardContent>
        </Card>
        <Card className={sectionCard}>
          <CardHeader>
            <CardTitle>AI performance</CardTitle>
            <CardDescription>Orders versus AI workflow completions.</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceBarChart data={revenueSeries} />
          </CardContent>
        </Card>
      </div>
    </MotionPage>
  );
};

const settingsSchema = z.object({
  company: z.string().min(2),
  website: z.string().url(),
  supportEmail: z.string().email()
});

type SettingsValues = z.infer<typeof settingsSchema>;

export const SettingsPage = () => {
  const { register, handleSubmit } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      company: "BusinessOS Demo Inc.",
      website: "https://businessos.ai",
      supportEmail: "support@businessos.ai"
    }
  });

  const handleSaveSettings = () => {
    toast.success("Mock settings saved");
  };

  return (
    <MotionPage>
      <PageHeader
        eyebrow="Settings"
        title="Company profile, integrations, API keys and subscription controls."
        description="A complete mock settings surface for branding, users, roles, integrations, notifications and fake API credentials."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className={sectionCard}>
          <CardHeader>
            <CardTitle>Company profile</CardTitle>
            <CardDescription>Validated with React Hook Form and Zod.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(handleSaveSettings)}>
              <Input aria-label="Company name" {...register("company")} />
              <Input aria-label="Website" {...register("website")} />
              <Input aria-label="Support email" {...register("supportEmail")} />
              <Button type="submit">Save mock settings</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className={sectionCard}>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Simulated connection status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["OpenAI", "n8n", "Shopify", "Meta Ads", "WhatsApp Cloud"].map((integration) => (
                <div key={integration} className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
                  <span className="text-white">{integration}</span>
                  <Switch defaultChecked aria-label={`Toggle ${integration}`} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={sectionCard}>
            <CardHeader>
              <CardTitle>Fake API keys</CardTitle>
              <CardDescription>Investor-safe placeholder credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["bos_live_sk_mock_••••8291", "openai_mock_••••4102", "n8n_webhook_••••7388"].map((key) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 font-mono text-sm text-slate-300">
                  {key}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MotionPage>
  );
};
