import { motion } from "framer-motion";
import appScreen from "@/assets/work/web6.jpeg";

const PLAY_URL = "https://play.google.com/store/apps/details?id=canzo.in";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(
  PLAY_URL
)}`;
const APP_SCREEN_URL = appScreen;

const PlayStoreBadge = () => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Get Canzo on Google Play"
    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      <path fill="#34A853" d="M3.6 20.5c.3.5.9.7 1.5.4l10-5.8-2.7-2.7L3.6 20.5z" />
      <path fill="#FBBC04" d="M20.4 11.1l-3.6-2.1-3 2.9 3 2.9 3.6-2.1c.9-.5.9-1.8 0-2.3z" />
      <path fill="#4285F4" d="M3.6 3.5C3.5 3.7 3.4 4 3.4 4.3v15.4c0 .3.1.6.2.8l9.6-9.5L3.6 3.5z" />
      <path fill="#EA4335" d="M5.1 3.1c-.6-.3-1.2-.1-1.5.4l8.8 8.8 2.7-2.7-10-6.5z" />
    </svg>
    <div className="flex flex-col leading-tight text-left ">
      <span className="text-[10px] uppercase tracking-wide opacity-80">Get it on</span>
      <span className="text-base font-semibold">Google Play</span>
    </div>
  </a>
);

type PhoneVariant = "qr" | "screen";

const PhoneMockup = ({
  variant,
  className = "",
}: {
  variant: PhoneVariant;
  className?: string;
}) => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Canzo from Google Play"
    className={`relative block w-[200px] sm:w-[210px] md:w-[215px] lg:w-[230px] aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[8px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.02] ${className}`}
  >
    {/* Side buttons */}
    <span aria-hidden className="absolute -left-[3px] top-[80px] h-7 w-[3px] rounded-l bg-neutral-800" />
    <span aria-hidden className="absolute -left-[3px] top-[120px] h-12 w-[3px] rounded-l bg-neutral-800" />
    <span aria-hidden className="absolute -left-[3px] top-[175px] h-12 w-[3px] rounded-l bg-neutral-800" />
    <span aria-hidden className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r bg-neutral-800" />

    {/* Inner bezel */}
    <div className="relative w-full h-full rounded-[2.1rem] bg-white overflow-hidden ">
      {/* Dynamic Island */}
      <div
        aria-hidden
        className="absolute top-2 left-1/2 -translate-x-1/2 h-[22px] w-[85px] rounded-full bg-black z-20 flex items-center justify-end pr-2.5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
      </div>

      {variant === "qr" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pt-9 pb-6">
          <p className="text-center text-[13px] font-semibold text-neutral-800 leading-snug">
            Scan to Download
          </p>
          <div className="mt-4 rounded-2xl border-2 border-accent/70 p-2.5 bg-white">
            <img
              src={QR_URL}
              alt="Scan to download Canzo on Google Play"
              className="w-[120px] h-[120px] block"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-[10px] text-center text-neutral-500 leading-tight">
            Point your camera at the QR
          </p>
        </div>
      ) : (
        <img
          src={APP_SCREEN_URL}
          alt="Canzo app preview"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  </a>
);

const DownloadAppSection = () => {
  return (
    <section
      id="download-app"
      className="flex items-center py-section bg-yellow-500/10"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-card border border-border px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.5rem,5vw,4rem)]"
        >
          {/* Mobile: phone with app screen on top, text below */}
          <div className="md:hidden">
            <div className="relative w-full flex justify-center py-6">
              <PhoneMockup variant="qr" className="rotate-[-3deg]" />
            </div>
            <div className="pt-8 text-left">
              <h2 className="text-fluid-h1 leading-[1.1] font-display font-bold text-foreground tracking-tight">
                Download the<br />app now!
              </h2>
              <p className="mt-5 text-fluid-body text-muted-foreground">
                Experience seamless campus ordering with the Canzo app
              </p>
              <div className="mt-7">
                <PlayStoreBadge />
              </div>
            </div>
          </div>

          {/* Desktop: copy left, QR phone right */}
          <div className="hidden md:grid grid-cols-2 gap-[var(--space-gap)] items-center">
            <div>
              <h2 className="text-fluid-h1 font-display font-bold text-foreground tracking-tight">
                Download the app now!
              </h2>
              <p className="mt-4 text-fluid-body text-muted-foreground max-w-md">
                Experience seamless campus ordering only on the Canzo app.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PlayStoreBadge />
              </div>
            </div>
            <div className="relative flex justify-center items-center py-4">
              <PhoneMockup variant="qr" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default DownloadAppSection;