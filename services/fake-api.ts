import {
  activityFeed,
  campaigns,
  channelSeries,
  conversations,
  customers,
  executiveMetrics,
  leads,
  orders,
  products,
  revenueSeries
} from "@/mock/business-data";
import { sleep } from "@/lib/utils";

export const fakeApi = {
  async getDashboard() {
    await sleep(450);
    return { executiveMetrics, revenueSeries, channelSeries, activityFeed, orders, products, campaigns };
  },
  async getCrm() {
    await sleep(350);
    return { leads };
  },
  async getCommerce() {
    await sleep(350);
    return { products, orders };
  },
  async getCustomers() {
    await sleep(350);
    return { customers, orders };
  },
  async getMarketing() {
    await sleep(350);
    return { campaigns, revenueSeries };
  },
  async getAiAssistant() {
    await sleep(350);
    return { conversations };
  }
};
