// app/providers.tsx
'use client'

import React from "react";

import {ComponentApiProvider} from "@/lib/component-api-provider";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ComponentApiProvider>
      {children}
    </ComponentApiProvider>
  )
}