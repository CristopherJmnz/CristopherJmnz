import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * useNavBubble
 * Encapsula la lógica del indicador "bubble" para el FloatingNav.
 *
 * Responsabilidades:
 * - Posiciona y anima la bubble sobre el item activo/hover.
 * - Evita saltos raros: suprime updates intermedios del activeId durante scroll programático tras click.
 * - Recalcula en resize/orientationchange y con ResizeObserver.
 *
 * @param {Object} params
 * @param {{id:string,label?:string,icon?:string}[]} params.items Lista de items del nav (ordenados).
 * @param {string} params.activeId Id del item activo (controlado por observer externo / scroll).
 * @param {boolean} [params.stepThrough=true] Si true, en saltos largos navega por pasos intermedios.
 * @param {number} [params.offset=200] Offset vertical (px) para considerar una sección "activa" al liberar la supresión tras click.
 * @param {number} [params.stepDelayMs=60] Delay en ms entre pasos cuando stepThrough=true.
 * @param {number} [params.suppressionTimeoutMs=2200] Timeout máximo en ms para liberar supresión si no se alcanza la sección objetivo.
 *
 * @returns {{
 *  containerRef: import('react').RefObject<HTMLElement>,
 *  registerBtnRef: (id:string)=> (el:HTMLElement|null)=>void,
 *  bubbleVisible: boolean,
 *  bubbleStyle: {left:string, top:string, width:string, height:string},
 *  handleMouseEnter: (id:string)=>void,
 *  handleMouseLeave: ()=>void,
 *  handleClick: (id:string, onSelect?: (id:string)=>void)=>void,
 * }} API pública del hook.
 */
export function useNavBubble({
  items,
  activeId,
  stepThrough = true,
  offset = 200,
  stepDelayMs = 60,
  suppressionTimeoutMs = 2200,
}) {
  const containerRef = useRef(null);
  const btnElsRef = useRef({}); // id -> element

  const [bubble, setBubble] = useState({ x: 0, y: 0, w: 0, h: 0, visible: false });
  const [hoveredId, setHoveredId] = useState(null);

  const bubbleIndexRef = useRef(0);
  const rafRef = useRef(0);
  const scrollClearerRef = useRef(null);

  // Supresión de updates del observer durante scroll por click
  const suppressTargetRef = useRef(null);
  const suppressTimerRef = useRef(null);

  const getIndexById = useCallback((id) => items.findIndex((i) => i.id === id), [items]);

  const updateBubbleForId = useCallback((id) => {
    const run = () => {
      const el = btnElsRef.current[id];
      const container = containerRef.current;
      if (!el || !container) return;
      const r = el.getBoundingClientRect();
      const rc = container.getBoundingClientRect();
      const x = r.left - rc.left + r.width / 2;
      const y = r.top - rc.top + r.height / 2;
      setBubble({ x, y, w: r.width, h: r.height, visible: true });
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(run);
  }, []);

  const scheduleUpdate = useCallback(() => {
    const id = hoveredId ?? items[bubbleIndexRef.current]?.id ?? activeId ?? items[0]?.id;
    if (id) updateBubbleForId(id);
  }, [activeId, hoveredId, items, updateBubbleForId]);

  // Init en primer layout
  const hasInitRef = useRef(false);
  useLayoutEffect(() => {
    if (hasInitRef.current) return;
    const initialId = activeId ?? items[0]?.id;
    if (initialId) {
      const idx = getIndexById(initialId);
      bubbleIndexRef.current = Math.max(0, idx);
      updateBubbleForId(initialId);
      hasInitRef.current = true;
    }
  }, [activeId, items, getIndexById, updateBubbleForId, stepThrough]);

  // Hover preview (no tocar activeId aquí para no interferir con supresión/animación principal)
  useEffect(() => {
    if (hoveredId) {
      updateBubbleForId(hoveredId);
    } else {
      // Reposiciona con el índice actual (o activeId si no hay índice) sin forzar cambios
      // Esto evita arrastrar la bubble a IDs intermedios durante la supresión por click
      scheduleUpdate();
    }
  }, [hoveredId, scheduleUpdate, updateBubbleForId]);

  // Reposición en resize/orientationchange
  useEffect(() => {
    const onResize = () => scheduleUpdate();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [scheduleUpdate]);

  // Observa cambios de tamaño del contenedor y botones
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => scheduleUpdate());
    if (containerRef.current) ro.observe(containerRef.current);
    items.forEach((it) => {
      const el = btnElsRef.current[it.id];
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [items, scheduleUpdate]);

  // Limpia refs de botones que ya no existen en items para evitar fugas
  useEffect(() => {
    const idsSet = new Set(items.map((i) => i.id));
    Object.keys(btnElsRef.current).forEach((id) => {
      if (!idsSet.has(id)) delete btnElsRef.current[id];
    });
  }, [items]);

  // Cambios del activeId (scroll natural): anima por pasos si salta varios índices,
  // excepto cuando estamos suprimiendo por click programático.
  useEffect(() => {
    if (!activeId) return;

    // En scroll programático tras click: ignora intermedios
    if (suppressTargetRef.current) {
      if (activeId === suppressTargetRef.current) {
        const targetIndex = getIndexById(activeId);
        updateBubbleForId(activeId);
        bubbleIndexRef.current = targetIndex;
        if (suppressTimerRef.current) {
          clearTimeout(suppressTimerRef.current);
          suppressTimerRef.current = null;
        }
        suppressTargetRef.current = null;
      }
      return;
    }

    const targetIndex = getIndexById(activeId);
    if (targetIndex < 0) return;
    const current = bubbleIndexRef.current;

    if (stepThrough && Math.abs(targetIndex - current) > 1) {
      const dir = targetIndex > current ? 1 : -1;
      let i = current + dir;
      let timer;
      const step = () => {
        updateBubbleForId(items[i].id);
        bubbleIndexRef.current = i;
        if (i !== targetIndex) {
          i += dir;
          timer = setTimeout(step, stepDelayMs);
        }
      };
      step();
      return () => clearTimeout(timer);
    }

    updateBubbleForId(activeId);
    bubbleIndexRef.current = targetIndex;
  }, [activeId, items, getIndexById, updateBubbleForId, stepThrough, stepDelayMs]);

  // Limpieza del timeout de supresión
  useEffect(
    () => () => {
      if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollClearerRef.current) {
        scrollClearerRef.current();
        scrollClearerRef.current = null;
      }
    },
    []
  );

  // API hacia el componente
  const registerBtnRef = useCallback(
    (id) => (el) => {
      if (el) btnElsRef.current[id] = el;
    },
    []
  );

  const handleMouseEnter = useCallback((id) => setHoveredId(id), []);
  const handleMouseLeave = useCallback(() => setHoveredId(null), []);

  const handleClick = useCallback(
    (id, onSelect) => {
      setHoveredId(null);
      const idx = getIndexById(id);
      if (idx >= 0) bubbleIndexRef.current = idx;
      updateBubbleForId(id); // mover inmediato a destino
      if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
      suppressTargetRef.current = id;
      // Limpia listener previo si existía
      if (scrollClearerRef.current) {
        scrollClearerRef.current();
        scrollClearerRef.current = null;
      }
      // Escucha scroll y libera supresión cuando la sección objetivo sea visible en el offset
      const onScrollCheck = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= offset && r.bottom >= offset) {
          const targetIndex = getIndexById(id);
          updateBubbleForId(id);
          bubbleIndexRef.current = targetIndex;
          if (suppressTimerRef.current) {
            clearTimeout(suppressTimerRef.current);
            suppressTimerRef.current = null;
          }
          suppressTargetRef.current = null;
          if (scrollClearerRef.current) {
            scrollClearerRef.current();
            scrollClearerRef.current = null;
          }
        }
      };
      window.addEventListener('scroll', onScrollCheck, { passive: true });
      scrollClearerRef.current = () => window.removeEventListener('scroll', onScrollCheck);
      // Fallback por si nunca llega el activeId destino (p.e., cancelas scroll)
      suppressTimerRef.current = setTimeout(() => {
        suppressTargetRef.current = null;
        suppressTimerRef.current = null;
        if (scrollClearerRef.current) {
          scrollClearerRef.current();
          scrollClearerRef.current = null;
        }
      }, suppressionTimeoutMs);
      if (typeof onSelect === 'function') onSelect(id);
    },
    [getIndexById, updateBubbleForId, offset, suppressionTimeoutMs]
  );

  return {
    containerRef,
    registerBtnRef,
    bubbleVisible: bubble.visible,
    bubbleStyle: {
      left: `${bubble.x}px`,
      top: `${bubble.y}px`,
      width: `${bubble.w}px`,
      height: `${bubble.h}px`,
    },
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
