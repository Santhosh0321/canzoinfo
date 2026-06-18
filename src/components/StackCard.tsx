import React, { useEffect, useRef, ReactNode } from "react";

interface StackCardProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

const StackCard: React.FC<StackCardProps> = ({ children, zIndex, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const updateStickyTop = () => {
      // If it's the combined card, we don't want to calculate sticky top because it uses relative positioning.
      if (card.classList.contains("stack-card-combined")) {
        card.style.top = "";
        return;
      }

      // Only apply dynamic sticky behavior on mobile
      if (window.innerWidth <= 767) {
        const height = card.offsetHeight;
        const windowHeight = window.innerHeight;

        // Stick such that the bottom of the card is exactly at 50% of the mobile screen height
        card.style.top = `${windowHeight * 0.5 - height}px`;
      } else {
        card.style.top = "";
      }
    };

    const handleScroll = () => {
      if (window.innerWidth > 767) {
        card.style.transform = "";
        card.style.filter = "";
        card.style.transformOrigin = "";
        card.style.willChange = "";
        return;
      }

      if (card.classList.contains("stack-card-combined")) {
        return;
      }

      const nextCard = card.nextElementSibling as HTMLElement;
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // The animation starts when the next card's top reaches 50% of screen height (bottom of stuck card)
        // and completes when next card reaches the top of the screen (0px).
        const startScrollY = windowHeight * 0.5;
        const endScrollY = 0;

        if (nextRect.top < startScrollY) {
          // Calculate progress from 0 (at 50% screen height) to 1 (at top of screen)
          const totalDistance = startScrollY - endScrollY;
          const currentDistance = startScrollY - nextRect.top;
          const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
          
          // Map progress to scale, brightness, 3D tilt, and translateY drop
          const newScale = 1 - (progress * 0.08); // Scales down from 1.0 to 0.92
          const brightness = 1 - (progress * 0.5); // Dims from 1.0 to 0.5 brightness
          const rotateX = progress * 3.5; // 3D tilt back up to 3.5 degrees
          const translateY = progress * 12; // Slides downward by 12px

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${newScale}) translateY(${translateY}px)`;
          card.style.filter = `brightness(${brightness})`;
          card.style.transformOrigin = "top center";
          card.style.willChange = "transform, filter";

          // Idea 2: Dynamic Amber Top Border & Glow Shadow
          // Brand Amber is HSL 39 86% 63% -> RGB (245, 158, 11)
          card.style.borderTopColor = `rgba(245, 158, 11, ${progress * 0.6})`;
          card.style.boxShadow = `0 -12px 32px -12px rgba(0, 0, 0, 0.4), 0 -4px 16px -2px rgba(245, 158, 11, ${progress * 0.3})`;
        } else {
          card.style.transform = "";
          card.style.filter = "";
          card.style.transformOrigin = "";
          card.style.willChange = "";
          card.style.borderTopColor = "";
          card.style.boxShadow = "";
        }
      }
    };

    updateStickyTop();
    handleScroll();

    const observer = new ResizeObserver(() => {
      updateStickyTop();
      handleScroll();
    });
    observer.observe(card);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`stack-card ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

export default StackCard;
