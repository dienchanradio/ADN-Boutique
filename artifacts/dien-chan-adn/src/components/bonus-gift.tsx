import { useEffect, useRef, useState } from 'react';
import './bonus-gift.css';

export function BonusGift() {
  const marker = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const section = marker.current?.closest('section');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const register = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('thanh-toan')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <>
      <span ref={marker} aria-hidden="true" />
      {seen && (visible || !dismissed) && (
        <div className={`bonus-floater ${visible ? 'bonus-floater-roaming' : 'bonus-floater-docked'}`}>
          <button type="button" className="bonus-floater-link" onClick={register}
            aria-label="Nhận 6 món quà — đến phần đăng ký" title="Nhận quà — Đăng ký học">
            <img src={`${import.meta.env.BASE_URL}assets/bonus-floating-gift.png`}
              width="704" height="1000" alt="" />
          </button>
          {!visible && <button type="button" className="bonus-floater-close"
            aria-label="Ẩn quà tặng nổi" onClick={() => setDismissed(true)}>×</button>}
        </div>
      )}
    </>
  );
}