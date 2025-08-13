import { useEffect } from 'react';

export function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      if (!ref?.current) return;
      if (!ref.current.contains(e.target)) onOutside?.(e);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutside]);
}
