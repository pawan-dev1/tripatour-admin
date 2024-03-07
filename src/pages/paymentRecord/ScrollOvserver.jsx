import { useEffect, useRef } from "react";

export const ScrollObserver = ({ onBottomReached }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 1.0, // Trigger when target is fully visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onBottomReached();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [onBottomReached]);

  return <div ref={targetRef} />;
};
