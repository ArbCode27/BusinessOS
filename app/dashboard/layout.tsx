import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

const DashboardLayout = ({ children }: { children: ReactNode }) => <AppShell>{children}</AppShell>;

export default DashboardLayout;
