import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => (
  <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl">
      <Badge variant="violet" className="mb-4">
        {eyebrow}
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">{description}</p>
    </div>
    {children}
  </div>
);
