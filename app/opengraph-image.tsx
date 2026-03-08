import { ImageResponse } from "next/og";

export const alt = "NAMES of G_D Across Cultures";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #f0f0f0 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f5f5f5 0%, transparent 50%)",
        }}
      >
        {/* Globe Icon with connected nodes representing different cultures */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circle - globe */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#1a1a1a"
              strokeWidth="2"
              fill="none"
            />
            {/* Horizontal line */}
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="18"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Vertical ellipse */}
            <ellipse
              cx="50"
              cy="50"
              rx="18"
              ry="45"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Center vertical line */}
            <line
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            {/* Center horizontal line */}
            <line
              x1="5"
              y1="50"
              x2="95"
              y2="50"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            {/* Connection nodes representing different cultures */}
            <circle cx="50" cy="12" r="6" fill="#3b82f6" />
            <circle cx="50" cy="88" r="6" fill="#10b981" />
            <circle cx="12" cy="50" r="6" fill="#f59e0b" />
            <circle cx="88" cy="50" r="6" fill="#ef4444" />
            <circle cx="25" cy="25" r="5" fill="#8b5cf6" />
            <circle cx="75" cy="25" r="5" fill="#ec4899" />
            <circle cx="25" cy="75" r="5" fill="#06b6d4" />
            <circle cx="75" cy="75" r="5" fill="#84cc16" />
            {/* Center node */}
            <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            NAMES of G_D
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#666666",
              textAlign: "center",
            }}
          >
            Across Cultures
          </div>
        </div>

        {/* Decorative script samples */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 50,
            fontSize: 24,
            color: "#999999",
          }}
        >
          <span>יהוה</span>
          <span>•</span>
          <span>Ọlọrun</span>
          <span>•</span>
          <span>الله</span>
          <span>•</span>
          <span>神</span>
          <span>•</span>
          <span>Θεός</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
