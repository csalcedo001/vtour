"use client";

import { ComponentApiProvider } from "./component-api-provider";
import { GlobalSingletonProvider } from "@/global-singleton-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ComponentApiProvider>
      <GlobalSingletonProvider>
        {children}
      </GlobalSingletonProvider>
    </ComponentApiProvider>
  );
}
