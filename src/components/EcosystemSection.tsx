import { motion } from "framer-motion";
import { GraduationCap, Store } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    features: ["Easy ordering", "Menu discovery", "Faster pickups", "Promotions & deals"],
  },
  {
    icon: Store,
    title: "Canteen Partners",
    features: ["Billing system", "Order management", "Inventory tracking", "Crowd insights"],
  },
];

const EcosystemSection = () => {
  return (
    <section id="ecosystem" className="py-section section-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(2rem,4vw,4rem)]"
        >
          <h2 className="text-fluid-h2 font-display font-bold">
            One platform, <span className="text-accent">two audiences.</span>
          </h2>
          <p className="mt-4 opacity-70 text-fluid-body">Canzo powers an entire campus food ecosystem.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-[var(--space-gap)] max-w-3xl mx-auto">

          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-accent/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-6">
                <a.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">{a.title}</h3>
              <ul className="space-y-2">
                {a.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm opacity-80">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
