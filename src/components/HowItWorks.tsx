import { motion } from "framer-motion";
import { School, UtensilsCrossed, PackageCheck } from "lucide-react";

const steps = [
  { icon: School, step: "01", title: "Select Canteen", desc: "Choose your campus and find nearby canteens." },
  { icon: UtensilsCrossed, step: "02", title: "Browse Menu", desc: "Explore meal-time menus and pick your favourites." },
  { icon: PackageCheck, step: "03", title: "Place Order", desc: "Confirm your order and pick it up -- Skip the line and Save your time." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-section bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(2rem,4vw,4rem)]"
        >
          <h2 className="text-fluid-h2 font-display font-bold">
            How it <span className="text-gradient">works.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-fluid-body">Three simple steps to skip the queue.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-[var(--space-gap)]">

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative bg-background rounded-2xl p-8 border border-border shadow-sm"
            >
              <div className="text-5xl font-display font-bold text-accent mb-4">{s.step}</div>
              <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
              {i < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground items-center justify-center text-2xl font-bold shadow-md z-10">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
