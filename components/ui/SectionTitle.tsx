import type { ReactNode } from "react";

export function SectionTitle({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <header className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      <span className="title-spark" aria-hidden="true">✦</span>
    </header>
  );
}
