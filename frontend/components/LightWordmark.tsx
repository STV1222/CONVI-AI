import Image from "next/image";

import { cn } from "@/lib/format";

/**
 * Single wordmark asset (`/light-logo-white.png`). On light theme, CSS in globals.css inverts to dark for contrast.
 */
export function LightWordmark({ className }: { className?: string }) {
  const imgClass =
    "light-wordmark-img block h-14 w-auto max-h-14 object-contain object-left leading-none sm:h-16 sm:max-h-16 lg:h-[4.5rem] lg:max-h-[4.75rem] bg-transparent";

  return (
    <div
      className={cn(
        "light-wordmark inline-flex items-center leading-none bg-transparent",
        className,
      )}
    >
      <Image
        src="/light-logo-white.png"
        alt="Light"
        width={397}
        height={225}
        priority
        unoptimized
        className={imgClass}
      />
    </div>
  );
}
