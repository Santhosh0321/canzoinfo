import { motion } from "framer-motion";
import { MapPin, Clock, Search, ShoppingCart, Wifi, LayoutGrid } from "lucide-react";

const features = [
  { icon: MapPin, title: "Location-Based Canteens", desc: "Find canteens by your college campus location." },
  { icon: Clock, title: "Meal-Time Menus", desc: "Morning, lunch, or evening — menus update by time." },
  { icon: Search, title: "Real-Time Search", desc: "Search for your favourite dishes instantly." },
  { icon: ShoppingCart, title: "Cart & Instant Ordering", desc: "Add items, checkout, and place orders in seconds." },
  { icon: Wifi, title: "Open / Closed Status", desc: "Know which canteens are active right now." },
  { icon: LayoutGrid, title: "Category Browsing", desc: "Pizza, biryani, juices, mocktails — browse by category." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(2rem,4vw,4rem)]"
        >
          <h2 className="text-fluid-h2 font-display font-bold">
            Everything you need to <span className="text-gradient">order smarter.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-fluid-body">
            Canzo packs powerful features into a simple, student-friendly interface.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-gap)]">

          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
