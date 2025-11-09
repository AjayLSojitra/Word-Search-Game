import { create } from "zustand";
import { PropsWithChildren, useEffect } from "react";

export interface AnalyticsProvider {
  identify?: (
    userId: string,
    traits: { name: string; email: string } | any
  ) => void;
  track?: (name: string, data?: any) => void;
  setCustomData?: (key: string, value: string) => void;
  page?: (name: string, data?: any) => void;
  reset?: () => void;
}

class Analytics {
  private analyticsProviders: AnalyticsProvider[];
  constructor(analyticsProviderFactories: (() => AnalyticsProvider)[]) {
    this.analyticsProviders = analyticsProviderFactories.map((f) => f());
  }

  identify(userId: string, traits: { name: string; email: string } | any) {
    this.analyticsProviders
      .filter((a) => a.identify)
      .forEach((a) => a.identify?.(userId, traits));
  }

  track(name: string, data?: any) {
    this.analyticsProviders
      .filter((a) => a.track)
      .forEach((a) => a.track?.(name, data));
  }

  setCustomData(key: string, value: string) {
    this.analyticsProviders
      .filter((a) => a.setCustomData)
      .forEach((a) => a.setCustomData?.(key, value));
  }

  page(name: string, data?: any) {
    this.analyticsProviders
      .filter((a) => a.page)
      .forEach((a) => a.page?.(name, data));
  }

  reset() {
    this.analyticsProviders.filter((a) => a.reset).forEach((a) => a.reset?.());
  }
}

interface AnalyticsStore {
  analytics: Analytics | undefined;
  setAnalytics: (analytics: Analytics) => void;
}

const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: undefined,
  setAnalytics: (analytics) => set({ analytics }),
}));

export function useAnalytics(): Analytics | undefined {
  return useAnalyticsStore((state) => state.analytics);
}

export function AnalyticsProvider(props: PropsWithChildren) {
  const { children } = props;
  const setAnalytics = useAnalyticsStore((state) => state.setAnalytics);

  useEffect(() => {
    const analytics = new Analytics([]);
    setAnalytics(analytics);
  }, [setAnalytics]);

  return <>{children}</>;
}
