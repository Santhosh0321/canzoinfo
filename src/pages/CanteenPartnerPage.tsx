import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Store, Receipt, BarChart3, Package, Megaphone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Partner Vendors", value: "50+", icon: Store },
  { label: "Orders Processed", value: "2M+", icon: Receipt },
  { label: "Revenue Growth", value: "35%", icon: BarChart3 },
  { label: "Avg. Prep Optimization", value: "40%", icon: Clock },
];

const features = [
  { icon: Receipt, title: "Digital Orders & Billing", desc: "Receive orders digitally with automatic billing and invoicing — no manual entry needed." },
  { icon: Package, title: "Inventory Management", desc: "Track stock levels in real time. Get alerts when items run low and auto-update your menu." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Understand your best sellers, peak hours, and revenue trends with detailed analytics." },
  { icon: Clock, title: "Faster Turnaround", desc: "Streamlined order flow means faster preparation and happier customers." },
  { icon: Megaphone, title: "Promotions & Deals", desc: "Run targeted promotions to boost sales during off-peak hours or launch new menu items." },
  { icon: Store, title: "Multi-Outlet Support", desc: "Manage multiple outlets from a single dashboard. Perfect for canteen chains on campus." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CanteenPartnerPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="container">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
            🏪 For Canteen Partners
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            Grow your canteen<br />
            <span className="text-gradient">business digitally.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Manage orders, inventory, and billing from one dashboard. Reach more students and increase your revenue with Canzo.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center">
              <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-10">
          Tools to <span className="text-gradient">scale</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
              <f.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center">
          <a href="https://canzo.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber">
            Partner with Canzo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CanteenPartnerPage;
