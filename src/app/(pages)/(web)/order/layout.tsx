import React from "react";
import {SessionProvider} from "next-auth/react";

export default function OrderLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionProvider>
        {children}
      </SessionProvider>
  );
}
