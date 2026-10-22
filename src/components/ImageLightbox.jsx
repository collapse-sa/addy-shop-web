import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ImageLightbox.css';

export default function ImageLightbox({ images, alt, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const closeRef = useRef(null);
  const previousRef = useRef(null);
  const nextRef = useRef(null);
  const closeTimerRef = useRef(null);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    closeTimerRef.current = window.setTimeout(onClose, 180);
  };

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
      closeRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      Object.assign(body.style, {
        position: previous.position,
        top: previous.top,
        left: previous.left,
        right: previous.right,
        width: previous.width,
        overflow: previous.overflow,
      });
      html.style.overflow = previous.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        setIndex((current) => (current - 1 + images.length) % images.length);
      } else if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        setIndex((current) => (current + 1) % images.length);
      } else if (event.key === 'Tab') {
        const controls = [closeRef.current, previousRef.current, nextRef.current].filter(Boolean);
        const current = controls.indexOf(document.activeElement);
        if (current === -1 || (event.shiftKey && current === 0) || (!event.shiftKey && current === controls.length - 1)) {
          event.preventDefault();
          (event.shiftKey ? controls[controls.length - 1] : controls[0])?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });

  if (!images.length) return null;

  return createPortal(
    <div className={`image-lightbox${visible ? ' is-visible' : ''}`} role="dialog" aria-modal="true" aria-label={`Fotografía ampliada de ${alt}`} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button ref={closeRef} className="image-lightbox-close" type="button" aria-label="Cerrar fotografía ampliada" onClick={close}>×</button>
      {images.length > 1 && <button ref={previousRef} className="image-lightbox-nav image-lightbox-prev" type="button" aria-label="Fotografía anterior" onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)}>‹</button>}
      <img className="image-lightbox-photo" src={images[index]} alt={alt} decoding="async" onClick={close} />
      {images.length > 1 && <button ref={nextRef} className="image-lightbox-nav image-lightbox-next" type="button" aria-label="Fotografía siguiente" onClick={() => setIndex((current) => (current + 1) % images.length)}>›</button>}
    </div>,
    document.body
  );
}
