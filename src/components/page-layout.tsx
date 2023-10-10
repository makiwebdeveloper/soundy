import { cn } from "@/lib/cn";
import { ReactNode } from "react";

/* LAYOUT */
interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: LayoutProps) {
  return (
    <div className={cn("p-3 2xl:p-5 space-y-3", className)}>{children}</div>
  );
}

/* HEADER */
interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: HeaderProps) {
  return <header className={cn("", className)}>{children}</header>;
}

/* TITLE */
interface TitleProps {
  children?: ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: TitleProps) {
  return (
    <h1 className={cn("text-2xl 2xl:text-4xl font-semibold", className)}>
      {children}
    </h1>
  );
}

/* DESCRIPTION */
interface DescriptionProps {
  children?: ReactNode;
  className?: string;
}

export function PageDescription({ children, className }: DescriptionProps) {
  return (
    <p className={cn("text-sm text-white/50 font-medium", className)}>
      {children}
    </p>
  );
}

/* Content */
interface ContentProps {
  children?: ReactNode;
  className?: string;
}

export function PageContent({ children, className }: ContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}
