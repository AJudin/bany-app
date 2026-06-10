import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trees, Shield, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Trees,
    text: 'Сухая строганная доска из северной сосны',
  },
  {
    icon: Shield,
    text: 'Контроль качества на каждом этапе',
  },
  {
    icon: Truck,
    text: 'Доставка в любую точку России',
  },
];

export function AboutProductionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.animate-in');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F5F0] px-6 py-[120px] lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* Text Content */}
          <div>
            <span className="animate-in text-label text-[#C4703F]">О ПРОИЗВОДСТВЕ</span>
            <h2 className="animate-in mt-4 font-display text-3xl font-medium leading-[1.15] text-[#2C2C2C] md:text-4xl lg:text-5xl">
              Современное производство в Тульской области
            </h2>
            <p className="animate-in mt-6 text-lg leading-relaxed text-[#6B6B6B]">
              Собственный завод площадью 3 000 м². Полный цикл: от раскроя дерева до финишной отделки. Производительность — до 15 модулей в месяц.
            </p>

            {/* Features List */}
            <div className="animate-in mt-8 flex flex-col gap-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(196,112,63,0.1)]">
                    <item.icon size={20} className="text-[#C4703F]" />
                  </div>
                  <span className="text-[#2C2C2C]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-in mt-8">
              <Link
                to="/production"
                className="inline-flex items-center gap-2 rounded bg-[#C4703F] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors duration-250 hover:bg-[#A85A2F]"
              >
                Подробнее о производстве
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="animate-in overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <img
              src="/images/production.jpg"
              alt="Производство модульных бань"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
