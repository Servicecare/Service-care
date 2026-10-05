"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { businessConfig } from "@/config/business";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/referrals", label: "Referrals" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-heading text-2xl font-bold text-brand-600 hover:text-brand-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md">
            {businessConfig.companyName}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md px-2 py-1 -mx-2",
                  isActive ? "text-brand-600" : "text-text-primary hover:text-brand-600"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-4 lg:gap-x-6">
          <Link 
            href="/contact" 
            className="hidden rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all active:scale-[0.98] lg:block"
          >
            Get Started
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
