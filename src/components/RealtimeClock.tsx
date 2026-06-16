import { useEffect, useState } from "react";

const RealtimeClock = () => {
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

  const cx = 50;
  const cy = 50;

  return (
    <svg
      width="0.55em"
      height="0.55em"
      viewBox="0 0 100 100"
      className="inline-block"
      style={{ verticalAlign: '0.03em', marginLeft: '0.01em' }}
    >
      <circle cx={cx} cy={cy} r={40} fill="none" stroke="currentColor" strokeWidth={16} />
      <line
        x1={cx} y1={cy}
        x2={cx + 16 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={cy - 16 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="currentColor" strokeWidth={14} strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + 24 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={cy - 24 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="currentColor" strokeWidth={10} strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + 28 * Math.sin((secondAngle * Math.PI) / 180)}
        y2={cy - 28 * Math.cos((secondAngle * Math.PI) / 180)}
        stroke="currentColor" strokeWidth={5} strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={4} fill="currentColor" />
    </svg>
  );
};

export default RealtimeClock;
