import { useEffect, useState } from "react";

interface CanzoLogoProps {
  size?: number; // font size in px
  className?: string;
}

const CanzoLogo = ({ size = 32, className = "" }: CanzoLogoProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;

  // Clock circle size matches the font's cap height (~75% of font size)
  const clockSize = size * 0.78;
  const r = clockSize / 2;
  const cx = r;
  const cy = r;
  const strokeW = Math.max(1.5, size * 0.06);

  return (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-tight ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      <span>Canz</span>
      <svg
        width={clockSize}
        height={clockSize}
        viewBox={`0 0 ${clockSize} ${clockSize}`}
        className="inline-block"
        style={{ 
          verticalAlign: "baseline",
          marginBottom: size * 0.04,
          marginLeft: size * -0.02,
          marginRight: size * -0.02,
        }}
      >
        {/* Clock circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r - strokeW}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeW}
        />
        {/* Hour markers - 4 main ones */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const inner = r * 0.7;
          const outer = r * 0.85;
          return (
            <line
              key={angle}
              x1={cx + inner * Math.sin(rad)}
              y1={cy - inner * Math.cos(rad)}
              x2={cx + outer * Math.sin(rad)}
              y2={cy - outer * Math.cos(rad)}
              stroke="currentColor"
              strokeWidth={strokeW * 0.6}
              strokeLinecap="round"
            />
          );
        })}
        {/* Hour hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r * 0.45) * Math.sin((hourAngle * Math.PI) / 180)}
          y2={cy - (r * 0.45) * Math.cos((hourAngle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={strokeW * 0.9}
          strokeLinecap="round"
        />
        {/* Minute hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r * 0.65) * Math.sin((minuteAngle * Math.PI) / 180)}
          y2={cy - (r * 0.65) * Math.cos((minuteAngle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={strokeW * 0.7}
          strokeLinecap="round"
        />
        {/* Second hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r * 0.75) * Math.sin((secondAngle * Math.PI) / 180)}
          y2={cy - (r * 0.75) * Math.cos((secondAngle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={strokeW * 0.35}
          strokeLinecap="round"
          opacity={0.7}
        />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={strokeW * 0.6} fill="currentColor" />
      </svg>
    </span>
  );
};

export default CanzoLogo;
