import { useEffect, useRef } from 'react';
import { ContactPopup } from '@/components/ContactPopup';
import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Проектирование',
    description: 'Создаём 3D-модель, согласовываем планировку',
  },
  {
    number: '02',
    title: 'Каркас',
    description: 'Собираем каркас из сухой строганной доски 45×95 мм',
  },
  {
    number: '03',
    title: 'Утепление',
    description: '200 мм базальтовой ваты, фольгированная пароизоляция',
  },
  {
    number: '04',
    title: 'Инженерия',
    description: 'Электрика, водоснабжение, канализация',
  },
  {
    number: '05',
    title: 'Отделка',
    description: 'Вагонка из липы/осины, полки, печь',
  },
  {
    number: '06',
    title: 'Контроль',
    description: '7 этапов проверки качества',
  },
];

const techSpecs = [
  {
    title: 'Каркас',
    description: 'Двойная обвязка, шаг стоек 585 мм. Выдерживает снеговую нагрузку 180 кг/м²',
  },
  {
    title: 'Утепление',
    description: '200 мм базальтовой ваты = каменная стена толщиной 1.5 м',
  },
  {
    title: 'Пароизоляция',
    description: 'Фольгированный Изоспан FB. Защита от конденсата 100%',
  },
  {
    title: 'Печь',
    description: 'Harvia, Kastor или Теплодар — на выбор. Установка включена',
  },
];

export function Production() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const steps = stepsRef.current;
    const tech = techRef.current;

    const triggers: ScrollTrigger[] = [];

    if (steps) {
      const cards = steps.querySelectorAll('.step-card');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: steps,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      tl.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }

    if (tech) {
      const items = tech.querySelectorAll('.animate-in');
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: tech,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      tl2.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      });
      if (tl2.scrollTrigger) triggers.push(tl2.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-[#2C2C2C] px-6" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <img
            src="/images/production.jpg"
            alt="Производство"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center">
          <span className="text-label text-[#C4703F]">ПРОИЗВОДСТВО</span>
          <h1 className="mt-4 font-display text-3xl font-medium text-white md:text-5xl lg:text-6xl">
            Как рождается ваша баня
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-lg text-white/80">
            Полный цикл — от дерева до готового модуля. 7 этапов, каждый под контролем.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section ref={stepsRef} className="bg-[#F5F5F0] px-6 py-[120px] lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-16 text-center font-display text-3xl font-medium text-[#2C2C2C] md:text-4xl">
            7 этапов создания вашей бани
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card rounded-lg border-l-[3px] border-[#C4703F] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              >
                <span className="font-display text-4xl font-medium text-[#C4703F] opacity-30">
                  {step.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium text-[#2C2C2C]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          {/* Step 7 - Special */}
          <div className="step-card mt-6 overflow-hidden rounded-lg bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <span className="font-display text-4xl font-medium text-[#C4703F] opacity-30">
                  07
                </span>
                <h3 className="mt-2 font-display text-2xl font-medium text-[#2C2C2C]">
                  Доставка и монтаж
                </h3>
                <p className="mt-4 leading-relaxed text-[#6B6B6B]">
                  Привозим ваш модуль на участок, устанавливаем на фундамент (винтовые сваи или ленточный), подключаем все коммуникации. Через несколько часов после прибытия баня готова к использованию.
                </p>
              </div>
              <div className="h-64 lg:h-auto">
                <img
                  src="/images/case-2.jpg"
                  alt="Доставка и монтаж"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Advantages */}
      <section ref={techRef} className="bg-white px-6 py-[120px] lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <div>
              <h2 className="animate-in font-display text-3xl font-medium leading-[1.15] text-[#2C2C2C] md:text-4xl">
                Технологические преимущества
              </h2>
              <div className="animate-in mt-8 flex flex-col gap-6">
                {techSpecs.map((spec, index) => (
                  <div key={index} className="rounded-lg border border-[#E0E0D8] p-6">
                    <h4 className="font-display text-lg font-medium text-[#2C2C2C]">
                      {spec.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="animate-in overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <img
                src="/images/production.jpg"
                alt="Технологические детали"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2C2C2C] px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-medium text-white md:text-4xl">
          Хотите увидеть производство своими глазами?
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-lg text-white/70">
          Приезжайте на экскурсию! Покажем цех, материалы и готовые модули.
        </p>
        <button
          onClick={() => setPopupOpen(true)}
          className="mt-8 rounded bg-[#C4703F] px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#A85A2F]"
        >
          Записаться на экскурсию
        </button>
      </section>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </main>
  );
}
