import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '22%',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Globe circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Horizontal ellipse */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
          />
          {/* Vertical ellipse */}
          <ellipse
            cx="50"
            cy="50"
            rx="16"
            ry="42"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
          />
          {/* Connection nodes */}
          <circle cx="50" cy="8" r="5" fill="#3b82f6" />
          <circle cx="50" cy="92" r="5" fill="#10b981" />
          <circle cx="8" cy="50" r="5" fill="#f59e0b" />
          <circle cx="92" cy="50" r="5" fill="#ef4444" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="7" fill="#ffffff" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
