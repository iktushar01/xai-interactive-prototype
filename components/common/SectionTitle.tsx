import { cn } from "@/utils/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-white/5 px-4 py-1 text-sm font-medium text-[var(--secondary)]">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}