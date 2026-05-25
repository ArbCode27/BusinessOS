"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { productHighlights } from "@/config/navigation";

const loginSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  password: z.string().min(6, "Use at least 6 characters")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "founder@businessos.ai",
      password: "businessos"
    }
  });

  const handleLogin = async () => {
    toast.success("Welcome back. Demo workspace loaded.");
    router.push("/dashboard");
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1.08fr_0.92fr]">
      <div className="premium-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-sky-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[34rem] rounded-full bg-violet-500/20 blur-3xl" />

      <section className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300 to-violet-500 text-slate-950 shadow-lg shadow-sky-500/30">
            <Sparkles className="size-6" />
          </span>
          <div>
            <p className="font-semibold text-white">BusinessOS</p>
            <p className="text-sm text-slate-500">AI operating system for commerce</p>
          </div>
        </div>

        <div className="my-16 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-sky-200">
              <Bot className="size-4" />
              Connected to mock OpenAI + n8n automations
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Run your entire business from one intelligent command center.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              CRM, ecommerce, customer support, analytics and marketing automation in a premium SaaS demo built to impress clients and investors.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {productHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="bg-white/[0.045] p-5">
                  <Icon className="mb-4 size-6 text-sky-300" />
                  <h2 className="font-medium text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          {["CRM", "Ecommerce", "Analytics", "AI Support", "Marketing"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-md"
        >
          <Card className="glass-panel overflow-hidden p-8">
            <div className="mb-8">
              <p className="text-sm text-sky-200">Investor demo workspace</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Sign in to BusinessOS</h2>
              <p className="mt-2 text-sm text-slate-400">Fake login. Use the prefilled demo credentials.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                  Work email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                  <Input id="email" className="pl-10" autoComplete="email" {...register("email")} />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                  <Input id="password" className="pl-10" type="password" autoComplete="current-password" {...register("password")} />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                Launch demo workspace
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default LoginPage;
