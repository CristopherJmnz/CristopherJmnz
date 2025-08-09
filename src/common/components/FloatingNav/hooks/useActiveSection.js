import { useEffect, useState } from "react";

export function useActiveSection(sectionIds, offset = 200) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= offset && r.bottom >= offset;
      });
      if (current) setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}
