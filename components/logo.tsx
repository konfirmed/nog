interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe circle */}
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Horizontal ellipse */}
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Vertical ellipse */}
      <ellipse
        cx="50"
        cy="50"
        rx="16"
        ry="42"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Connection nodes representing different cultures */}
      <circle cx="50" cy="8" r="5" fill="#3b82f6" />
      <circle cx="50" cy="92" r="5" fill="#10b981" />
      <circle cx="8" cy="50" r="5" fill="#f59e0b" />
      <circle cx="92" cy="50" r="5" fill="#ef4444" />
      <circle cx="22" cy="22" r="4" fill="#8b5cf6" />
      <circle cx="78" cy="22" r="4" fill="#ec4899" />
      <circle cx="22" cy="78" r="4" fill="#06b6d4" />
      <circle cx="78" cy="78" r="4" fill="#84cc16" />
      {/* Center node */}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}
