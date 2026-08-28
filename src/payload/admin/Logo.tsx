/* Composants de marque du portail admin — SVG inline (aucune dépendance au site). */

function Mark({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 172" style={{ height: size, width: "auto" }} aria-hidden>
      <defs>
        <linearGradient id="oc-admin-d" x1="50" y1="30" x2="50" y2="168" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FD0F5" />
          <stop offset="0.45" stopColor="#2E9FDF" />
          <stop offset="1" stopColor="#0A1E7A" />
        </linearGradient>
      </defs>
      <circle cx="47" cy="26" r="17" fill="#5cc0ee" />
      <circle cx="66" cy="47" r="6.2" fill="#5cc0ee" />
      <path d="M50 52c12 30 36 50 36 74a36 36 0 0 1-72 0c0-24 24-44 36-74Z" fill="url(#oc-admin-d)" />
      <g fill="#fff">
        <path d="M50 130 44 117 50 104 56 117Z" />
        <path d="M50 130 63 124 76 130 63 136Z" />
        <path d="M50 130 56 143 50 156 44 143Z" />
        <path d="M50 130 37 124 24 130 37 136Z" />
        <circle cx="59.4" cy="120.6" r="4.6" />
        <circle cx="40.6" cy="120.6" r="4.6" />
        <circle cx="59.4" cy="139.4" r="4.6" />
        <circle cx="40.6" cy="139.4" r="4.6" />
        <circle cx="50" cy="130" r="2.6" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Mark size={44} />
      <span style={{ fontSize: 22, letterSpacing: "0.14em", fontWeight: 500 }}>
        O&apos;Crystal <span style={{ opacity: 0.55, fontSize: 13 }}>Admin</span>
      </span>
    </div>
  );
}

export function Icon() {
  return <Mark size={22} />;
}
