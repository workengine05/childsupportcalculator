"use client";

import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">
              State Support
            </span>
          </Link>
          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#states" className="text-muted-foreground hover:text-primary transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
