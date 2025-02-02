'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from "react";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
      <>
        {children}
        <ProgressBar
            height="4px"
            color="hsl(var(--primary))"
            options={{
              showSpinner: false,
            }}
            stopDelay={2000}
            shallowRouting
        />
      </>
  );
};

export default ProgressProvider;
