import { useEffect, useRef } from 'react';
import { Clock, Shield, Thermometer } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: Clock,
    title: 'Готово за 14 дней',
    description:
      'Ваш модуль строится на заводе в контролируемых условиях. На участке — только установка и подключение. Никаких задержек из-за погоды.',
  },
  {
    icon: Shield,
    title: 'Заводское качество',
    description:
      'Каждый модуль собирается в цеху с контролем температуры и влажности. Используем сухую строганную доску — без усадки и щелей.',
  },
  {
    icon: Thermometer,
    title: 'Тепло с первого дня',
    description:
      'Утепление 200 мм, фольгированная пароизоляция. Прогрев за 30 минут, тепло держится 2 часа. Парься с комфортом даже зимой.',
  },
];

export function WhyModularSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.advantage-card');
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
    <section ref={sectionRef} className="bg-[#F5F5F0] px-6 py-[120px] lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-label text-[#C4703F]">ПОЧЕМУ МОДУЛЬНОСТЬ</span>
          <h2 className="mx-auto mt-4 max-w-[700px] font-display text-3xl font-medium leading-[1.15] text-[#2C2C2C] md:text-4xl lg:text-5xl">
            Строительство, которое не доставляет хлопот
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-lg leading-relaxed text-[#6B6B6B]">
            Забудьте о пыльных стройках, месяцах ожидания и скрытых расходах. Модульная технология — это новый уровень комфорта.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="advantage-card group rounded-xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(196,112,63,0.1)] transition-transform duration-300 group-hover:scale-110">
                <item.icon size={40} className="text-[#C4703F]" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-[#2C2C2C]">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-[#6B6B6B]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
