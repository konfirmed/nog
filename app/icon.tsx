import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <svg
          width="24"
          height="24"
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
            strokeWidth="4"
            fill="none"
          />
          {/* Horizontal ellipse */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
          />
          {/* Vertical ellipse */}
          <ellipse
            cx="50"
            cy="50"
            rx="16"
            ry="42"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
          />
          {/* Center dot */}
          <circle cx="50" cy="50" r="8" fill="#3b82f6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
