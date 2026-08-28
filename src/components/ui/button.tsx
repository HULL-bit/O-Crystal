"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/motion/magnetic";

const buttonVariants = cva(
  [
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden",
    "rounded-full font-medium tracking-wide whitespace-nowrap",
    "transition-[transform,box-shadow,background-color,color] duration-[var(--duration-base)] ease-[var(--ease-eau)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]",
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--gradient-eau)] bg-[length:180%_180%] bg-[position:0%_50%] text-white shadow-[var(--shadow-glow)] hover:bg-[position:100%_50%] hover:shadow-[0_0_60px_-8px_rgb(46_159_223/0.6)]",
        secondary:
          "glass text-[var(--color-foreground)] hover:border-[color-mix(in_oklab,var(--color-cristal)_55%,transparent)] hover:text-[var(--color-accent)]",
        metal:
          "border border-[color-mix(in_oklab,var(--color-argent-bright)_65%,transparent)] bg-[image:var(--gradient-argent)] bg-[length:220%_100%] bg-[position:0%_50%] text-[var(--color-nuit)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_6px_20px_-8px_rgb(5_15_61/0.55)] hover:bg-[position:100%_50%] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_-8px_rgb(5_15_61/0.6)]",
        ghost:
          "text-[var(--color-muted)] hover:bg-[var(--color-track)] hover:text-[var(--color-foreground)]",
        link: "rounded-none px-0 text-[var(--color-cristal-light)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  magnetic?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Filet lumineux qui balaie le bouton au survol (reflet d'argent). */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-[var(--duration-cinema)] ease-[var(--ease-eau)] group-hover:translate-x-full motion-reduce:hidden"
    />
  );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ className, variant, size, magnetic = false, children, ...props }, ref) {
    const classes = cn(buttonVariants({ variant, size }), className);
    const inner = (
      <>
        <Sheen />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </>
    );

    const node =
      "href" in props && props.href !== undefined ? (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as ButtonAsLink)}
        >
          {inner}
        </Link>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={classes}
          {...(props as ButtonAsButton)}
        >
          {inner}
        </button>
      );

    return magnetic ? <Magnetic>{node}</Magnetic> : node;
  },
);

export { buttonVariants };
