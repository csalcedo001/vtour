// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import React from "react";

import {ComponentApiProvider} from "@/src/component-api-provider";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ComponentApiProvider>
        {children}
      </ComponentApiProvider>
    </NextUIProvider>
  )
}