"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ComponentApiProvider } from "./component-api-provider";
import { Onborda, OnbordaProvider } from "onborda";
import { Tour } from "onborda/dist/types";
import CustomCard from "./components/CustomCard";
import { GlobalSingletonProvider } from "@/app/global-singleton-provider";

const tour1: Tour[] = [
  {
    tour: "tour1",
    steps: [
      {
        icon: <>👋</>,
        title: "Tour 1, Step 1",
        content: <>First tour, first step</>,
        selector: "#onborda-step1",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        // nextRoute: "/foo",
        // prevRoute: "/bar",
      },
      {
        icon: <>👋</>,
        title: "Tour 1, Step 2",
        content: <>First tour, second step</>,
        selector: "#onborda-step2",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        // nextRoute: "/foo",
        // prevRoute: "/bar",
      },
    ],
  },
];

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalSingletonProvider>
      <NextUIProvider>
        <ComponentApiProvider>
          <OnbordaProvider>
            <Onborda
              showOnborda={true}
              steps={tour1}
              shadowOpacity="0.8"
              cardComponent={CustomCard}
              cardTransition={{ duration: 0.5, type: "tween" }}
            >
              {children}
            </Onborda>
          </OnbordaProvider>
        </ComponentApiProvider>
      </NextUIProvider>
    </GlobalSingletonProvider>
  );
}
