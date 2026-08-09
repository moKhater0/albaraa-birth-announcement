import type { ReactNode } from "react";

export function SoftCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`soft-card ${className}`}>{children}</div>;
}
