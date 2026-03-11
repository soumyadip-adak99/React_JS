import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { IndianRupee } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <IndianRupee className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">PayTrack</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
