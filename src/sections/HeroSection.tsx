import { useEffect, useRef, useState } from 'react';
import { ContactPopup } from '@/components/ContactPopup';

export function HeroSection() {
  const [popupOpen, setPopupOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked, will show fallback image
      });
    }
  }, []);

  const scrollToCases = () => {
    const element = document.getElementById('cases');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/images/hero-fallback.jpg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Image Fallback (shown if video fails) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-fallback.jpg)' }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(44, 44, 44, 0.5) 0%, rgba(44, 44, 44, 0.2) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
        <span className="text-label text-white/85">
          МОДУЛЬНЫЕ БАНИ ПРЕМИУМ-КЛАССА
        </span>

        <h1
          className="mt-6 font-display text-4xl font-medium leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[72px]"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          Ваша баня готова через 14 дней
        </h1>

        <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-white/90">
          Производство, доставка и монтаж по всей России. Гарантия 5 лет.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setPopupOpen(true)}
            className="rounded bg-[#C4703F] px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors duration-250 hover:bg-[#A85A2F]"
          >
            Оставить заявку
          </button>
          <button
            onClick={scrollToCases}
            className="rounded border-[1.5px] border-white px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-250 hover:bg-white hover:text-[#2C2C2C]"
          >
            Смотреть проекты
          </button>
        </div>
      </div>

      {/* Contact Popup */}
      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
