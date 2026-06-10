import { useEffect, useRef, useState } from 'react';
import { ContactPopup } from '@/components/ContactPopup';
import { Ruler } from 'lucide-react';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.project-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-[#2C2C2C] to-[#3D3D3D] px-6" style={{ height: '40vh' }}>
        <div className="text-center">
          <span className="text-label text-[#C4703F]">КАТАЛОГ</span>
          <h1 className="mt-4 font-display text-3xl font-medium text-white md:text-5xl lg:text-6xl">
            Готовые проекты бань
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-lg text-white/80">
            3 проверенных решения — от компактной парной до просторной зоны отдыха
          </p>
        </div>
      </section>

      {/* Projects */}
      <section ref={sectionRef} className="bg-[#F5F5F0] px-6 py-[120px] lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Модульная баня ${project.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"

                  />
                  {/* Price Badge */}
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-[#C4703F] px-4 py-2">
                    <span className="text-label text-white">{project.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-display text-2xl font-medium text-[#2C2C2C]">
                    Модульная баня {project.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#6B6B6B]">
                    <Ruler size={16} className="text-[#C4703F]" />
                    {project.area}
                  </div>
                  <p className="mt-3 leading-relaxed text-[#6B6B6B]">
                    {project.description}
                  </p>
                  <p className="mt-3 text-xs text-[#6B6B6B]">
                    {project.specs}
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="mt-6 inline-flex items-center rounded border-[1.5px] border-[#C4703F] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#C4703F] transition-all hover:bg-[#C4703F] hover:text-white"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-medium text-[#2C2C2C]">
              Не нашли подходящий вариант?
            </h3>
            <p className="mx-auto mt-3 max-w-[560px] text-[#6B6B6B]">
              Мы можем адаптировать любой проект под ваши задачи или разработать индивидуальное решение.
            </p>
            <button
              onClick={() => setPopupOpen(true)}
              className="mt-6 rounded bg-[#C4703F] px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#A85A2F]"
            >
              Обсудить индивидуальный проект
            </button>
          </div>
        </div>
      </section>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </main>
  );
}
