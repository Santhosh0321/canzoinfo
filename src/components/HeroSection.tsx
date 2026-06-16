import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cardStudents from "@/assets/card-students.jpg";
import cardCanteen from "@/assets/card-canteen.jpg";
import cardInternship from "@/assets/card-internship.jpg";

const headlineAnim = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const subtitleAnim = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const } },
};

const ctaAnim = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.6, type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

const categories = [
  {
    title: "STUDENTS",
    subtitle: "Order & Discover",
    desc: "Browse menus, place orders instantly, skip the queue.",
    path: "/student",
    image: cardStudents,
  },
  {
    title: "COLLEGES & CANTEENS",
    subtitle: "Partner & Grow",
    desc: "Go live on Canzo, manage orders, and boost revenue.",
    path: "/colleges-canteens",
    image: cardCanteen,
  },
  {
    title: "INTERNSHIP PROGRAM",
    subtitle: "Learn & Earn Certificates",
    desc: "Gain real-world experience and get certified with Canzo.",
    path: "/internship",
    image: cardInternship,
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[88svh] flex flex-col pt-16 overflow-hidden">
      <div className="relative bg-accent py-section">
        <div className="absolute top-0 right-0 w-[min(40vw,400px)] aspect-square rounded-full bg-foreground/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[min(30vw,300px)] aspect-square rounded-full bg-foreground/5 blur-[100px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={headlineAnim.initial}
              animate={headlineAnim.animate}
              className="text-display font-display font-bold leading-tight tracking-tight text-accent-foreground"
            >
              What is Canzo?
            </motion.h1>
            <motion.p
              initial={subtitleAnim.initial}
              animate={subtitleAnim.animate}
              className="mt-5 text-fluid-body text-accent-foreground/80 max-w-2xl mx-auto"
            >
              Canzo is a smart campus food platform that connects students,
              canteen partners & colleges — making ordering, managing, and
              dining effortless.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative -mt-4 sm:-mt-8 pb-[clamp(3rem,5vw,6rem)]">

        <div className="container">
          <motion.div
            initial={ctaAnim.initial}
            animate={ctaAnim.animate}
            className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-gap)]"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat.title}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(cat.path);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-xl text-left cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1 uppercase tracking-wide">
                    {cat.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm group-hover:bg-amber-hover transition-colors w-fit">
                    Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
