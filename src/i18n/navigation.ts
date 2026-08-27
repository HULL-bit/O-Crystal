import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Wrappers de navigation localisés : à utiliser partout à la place de
 * `next/link` et `next/navigation` pour préserver la locale active.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
