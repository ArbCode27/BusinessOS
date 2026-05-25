import { ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Card, CardContent } from "@/components/ui/card";
import type { Metric } from "@/types/business";
import { formatPercent } from "@/lib/utils";

export const MetricCard = ({ metric }: { metric: Metric }) => (
  <Card className="group relative overflow-hidden bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:shadow-sky-500/10">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent opacity-0 transition group-hover:opacity-100" />
    <CardContent className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm text-slate-400">{metric.label}</span>
        <span className="rounded-full border border-white/10 bg-white/5 p-2 text-sky-200">
          <Sparkles className="size-4" />
        </span>
      </div>
      <div className="text-3xl font-semibold tracking-tight text-white">
        <AnimatedCounter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          compact={metric.value > 9999}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-emerald-300">
          <ArrowUpRight className="size-4" />
          {formatPercent(metric.trend)}
        </span>
        <span className="text-slate-500">{metric.detail}</span>
      </div>
    </CardContent>
  </Card>
);
