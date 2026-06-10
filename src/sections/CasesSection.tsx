import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/images/case-1.jpg',
    tag: 'ПРОЕКТ СТОКГОЛЬМ',
    title: 'Баня у озера в Карелии',
    description: 'Модуль 6×4 м с террасой. Установка на винтовые сваи. Клиент использует круглый год.',
  },
  {
    image: '/images/case-2.jpg',
    tag: 'ПРОЕКТ ФОСТЕР',
    title: 'Гостевой комплекс в Подмосковье',
    description: 'Два модуля: парная + зона отдыха. Панорамное остекление, дровяная печь.',
  },
  {
    image: '/images/case-3.jpg',
    tag: 'ПРОЕКТ ЖЕНЕВА',
    title: 'Компактная баня на даче',
    description: 'Компактный модуль 4×3 м. Вместил всё необходимое: парную, моечную и террасу.',
  },
];

export function CasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.case-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="cases" ref={sectionRef} className="bg-white px-6 py-[120px] lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16">
          <span className="text-label text-[#C4703F]">НАШИ РАБОТЫ</span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.15] text-[#2C2C2C] md:text-4xl lg:text-5xl">
            Бани, которые уже радуют хозяев
          </h2>
          <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-[#6B6B6B]">
            Каждый проект — это история о том, как мечта о собственной бане стала реальностью.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => (
            <div
              key={index}
              className="case-card group overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <span className="text-label text-[#C4703F]">{item.tag}</span>
                <h3 className="mt-3 font-display text-xl font-medium text-[#2C2C2C] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded border-[1.5px] border-[#C4703F] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-[#C4703F] transition-all duration-250 hover:bg-[#C4703F] hover:text-white"
          >
            Смотреть все проекты
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
