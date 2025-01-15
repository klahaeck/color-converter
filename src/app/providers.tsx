"use client";

import { ColorProvider } from "@/contexts/Color";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({
  children,
}: ProvidersProps) {
  return (
    <>
      <ColorProvider>
        {children}
      </ColorProvider>
    </>
  );
}
