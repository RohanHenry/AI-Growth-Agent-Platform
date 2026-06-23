import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, LayoutDashboard, Sparkles } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Website Growth Agent Platform",
  description: "Generate, preview, edit, and manage AI landing page strategies."
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generator", label: "Generator", icon: Sparkles }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="border-b border-line bg-white/88 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-ink">
                  AI Website Growth Agent
                </span>
                <span className="block text-xs text-muted">Landing pages that learn</span>
              </span>
            </Link>
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-cloud hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
