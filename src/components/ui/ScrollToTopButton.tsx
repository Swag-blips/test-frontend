import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-on-primary rounded-full shadow-[0_8px_32px_rgba(75,77,216,0.3)] hover:scale-110 hover:shadow-[0_12px_48px_rgba(75,77,216,0.4)] transition-all active:scale-95 premium-shadow group border border-white/10"
          aria-label="Scroll to top"
        >
          <ArrowUp
            size={24}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
