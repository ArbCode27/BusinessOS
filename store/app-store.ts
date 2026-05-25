import { create } from "zustand";
import type { Conversation, Lead, LeadStatus } from "@/types/business";
import { conversations, leads } from "@/mock/business-data";

type AppState = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
}));

type CrmState = {
  leads: Lead[];
  moveLead: (leadId: string, status: LeadStatus) => void;
};

export const useCrmStore = create<CrmState>((set) => ({
  leads,
  moveLead: (leadId, status) =>
    set((state) => ({
      leads: state.leads.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    }))
}));

type AiChatState = {
  conversations: Conversation[];
  activeConversationId: string;
  sendMessage: (content: string) => void;
};

export const useAiChatStore = create<AiChatState>((set, get) => ({
  conversations,
  activeConversationId: conversations[0]?.id ?? "",
  sendMessage: (content) => {
    const activeId = get().activeConversationId;
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                { role: "user", content, time: "Now" },
                {
                  role: "assistant",
                  content:
                    "I checked CRM, orders and campaign history. The recommended action is to trigger a WhatsApp recovery flow with a personalized bundle incentive.",
                  time: "Now"
                }
              ]
            }
          : conversation
      )
    }));
  }
}));
