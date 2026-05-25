"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Bell, ChevronLeft, Command, LogOut, Menu, Search, Sparkles } from "lucide-react";
import { appNavigation } from "@/config/navigation";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="premium-grid pointer-events-none fixed inset-0" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

      <aside
        className={cn(
          "glass-panel fixed bottom-5 left-5 top-5 z-40 hidden rounded-[2rem] p-3 transition-all duration-300 lg:block",
          sidebarCollapsed ? "w-24" : "w-72"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between px-3 py-2">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300 to-violet-500 text-slate-950 shadow-lg shadow-sky-500/30">
                <Sparkles className="size-5" />
              </span>
              {!sidebarCollapsed && (
                <span>
                  <span className="block text-sm font-semibold text-white">BusinessOS</span>
                  <span className="text-xs text-slate-500">AI Commerce Suite</span>
                </span>
              )}
            </Link>
            {!sidebarCollapsed && (
              <Button variant="ghost" size="icon" aria-label="Collapse sidebar" onClick={toggleSidebar}>
                <ChevronLeft className="size-4" />
              </Button>
            )}
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {appNavigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-400 transition-all hover:bg-white/10 hover:text-white",
                    isActive && "bg-white/10 text-white shadow-lg shadow-sky-500/10",
                    sidebarCollapsed && "justify-center"
                  )}
                >
                  <Icon className={cn("size-5", isActive && "text-sky-300")} />
                  {!sidebarCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            {!sidebarCollapsed ? (
              <>
                <p className="text-sm font-medium text-white">AI Autopilot</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">42 workflows active across revenue, support and retention.</p>
              </>
            ) : (
              <Sparkles className="mx-auto size-5 text-sky-300" />
            )}
          </div>
        </div>
      </aside>

      <div className={cn("relative z-10 min-h-screen transition-all duration-300 lg:pl-80", sidebarCollapsed && "lg:pl-32")}>
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
          <div className="flex h-20 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
              <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-500 md:flex">
                <Search className="size-4" />
                Search customers, orders, campaigns
                <span className="ml-12 flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs text-slate-400">
                  <Command className="size-3" /> K
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden md:inline-flex">
                <Sparkles className="size-4" />
                Ask BusinessOS AI
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400" aria-label="Open user menu">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/160?img=5" alt="User avatar" />
                      <AvatarFallback>BO</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Workspace settings</DropdownMenuItem>
                  <DropdownMenuItem>Invite team</DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
};
