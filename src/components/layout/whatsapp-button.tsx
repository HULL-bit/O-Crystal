"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { whatsappNumber } from "@/config/nav";
import { spring } from "@/lib/motion";

/**
 * Bouton WhatsApp Business flottant (usage courant au Sénégal).
 * TODO : remplacer `whatsappNumber` par le vrai numéro + message pré-rempli localisé.
 */
export function WhatsAppButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const to = setTimeout(() => setShown(true), 2600);
    return () => clearTimeout(to);
  }, []);

  if (!shown) return null;

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.7, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={spring.snappy}
      className="glass fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-[#4ade80] shadow-[var(--shadow-soft)] transition-transform hover:scale-105 md:bottom-8 md:left-8"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm0 18.02c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.49 3.66-8.15 8.15-8.15s8.14 3.66 8.14 8.15-3.65 8.14-8.14 8.14Zm4.47-6.1c-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.17-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42l-.47-.01c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    </motion.a>
  );
}
