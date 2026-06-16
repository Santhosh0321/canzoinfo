import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const CTASection = () => {
  return (
    <section className="py-section bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-fluid-h2 font-display font-bold mb-6">
            Ready to transform campus food ordering?
          </h2>
          <p className="text-muted-foreground mb-10 text-fluid-body">
            Join the Canzo ecosystem — whether you're a student or a canteen partner.
          </p>


          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://canzo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-amber-hover transition-all glow-pulse"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/colleges-canteens#partner-form"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border font-semibold hover:border-accent/50 transition-colors"
            >
              Partner as Canteen
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
