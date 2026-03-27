"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "ai" });
      cal("ui", { hideEventTypeDetails: true, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="ai"
      data-cal-link="kamil-kyzo/ai"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={className}
    >
      {children}
    </button>
  );
}
