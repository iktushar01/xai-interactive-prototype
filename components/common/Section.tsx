import { ReactNode } from "react";

import Container from "./Container";
import { cn } from "@/utils/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
}

export default function Section({
  id,
  children,
  className,
  containerClassName,
  withContainer = true,
}: SectionProps) {
  const content = withContainer ? (
    <Container className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 lg:py-32",
        className
      )}
    >
      {content}
    </section>
  );
}