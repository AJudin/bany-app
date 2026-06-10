import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Award, Shield, Truck, BadgeCheck } from 'lucide-react';
import { ContactFormSection } from '@/sections/ContactFormSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: Award,
    title: '5 лет на рынке',
    description: 'Опыт строительства более 200 бань',
  },
  {
    icon: Shield,
    title: 'Гарантия 5 лет',
    description: 'Полная гарантия на конструкцию и коммуникации',
  },
  {
    icon: Truck,
    title: 'Доставка по России',
    description: 'Собственный транспорт, доставим в любой регион',
  },
  {
    icon: BadgeCheck,
    title: 'Честная цена',
    description: 'Фиксированная стоимость, никаких скрытых платежей',
  },
];

export function About() {
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
      stagger: 0.12,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="flex min-h-[400px] items-center justify-center bg-gradient-to-br from-[#2C2C2C] to-[#3D3D3D] px-6" style={{ height: '50vh' }}>
        <div className="text-center">
          <span className="text-label text-[#C4703F]">О КОМПАНИИ</span>
          <h1 className="mt-4 font-display text-3xl font-medium text-white md:text-5xl lg:text-6xl">
            ЭкоБаня — бани, созданные с душой
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-lg text-white/80">
            5 лет строим модульные бани. Более 200 реализованных проектов по всей России.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section ref={sectionRef} className="bg-[#F5F5F0] px-6 py-[120px] lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[60%_40%] lg:gap-16">
            {/* Text */}
            <div>
              <h2 className="animate-in font-display text-3xl font-medium leading-[1.15] text-[#2C2C2C] md:text-4xl">
                Наша история
              </h2>
              <p className="animate-in mt-6 leading-relaxed text-[#6B6B6B]">
                ЭкоБаня была основана в 2020 году командой инженеров и строителей, объединённых идеей сделать качественные бани доступными. Мы начинали с небольшого цеха в Тульской области, а сегодня — это современный завод с полным производственным циклом.
              </p>
              <p className="animate-in mt-4 leading-relaxed text-[#6B6B6B]">
                Каждый модуль проходит 7 этапов контроля качества. Мы используем только сертифицированные материалы: сухую северную сосну, базальтовую вату, пароизоляцию Изоспан.
              </p>
            </div>

            {/* Contact Card */}
            <div className="animate-in rounded-xl bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <h3 className="font-display text-xl font-medium text-[#2C2C2C]">Контакты</h3>
              <div className="mt-6 flex flex-col gap-4">
                <a href="tel:+78005553535" className="flex items-center gap-3 text-[#6B6B6B] transition-colors hover:text-[#C4703F]">
                  <Phone size={18} className="text-[#C4703F]" />
                  +7 (800) 555-35-35
                </a>
                <a href="mailto:info@ecobanya.ru" className="flex items-center gap-3 text-[#6B6B6B] transition-colors hover:text-[#C4703F]">
                  <Mail size={18} className="text-[#C4703F]" />
                  info@ecobanya.ru
                </a>
                <div className="flex items-start gap-3 text-[#6B6B6B]">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#C4703F]" />
                  Тульская область, г. Новомосковск, промзона «Строитель»
                </div>
                <div className="flex items-center gap-3 text-[#6B6B6B]">
                  <Clock size={18} className="text-[#C4703F]" />
                  Пн-Пт: 9:00–18:00, Сб: 10:00–15:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white px-6 py-[120px] lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-16 text-center font-display text-3xl font-medium text-[#2C2C2C] md:text-4xl">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(196,112,63,0.1)]">
                  <item.icon size={32} className="text-[#C4703F]" />
                </div>
                <h3 className="mt-4 font-display text-xl font-medium text-[#2C2C2C]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B6B6B]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}
