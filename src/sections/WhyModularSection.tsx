import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    image: '/images/why-quality.jpg',
    title: 'Высокое заводское качество',
    description:
      'Строительство не зависит от капризов погоды (дождя, мороза или влажности). Элементы каркаса подгоняются на специализированном оборудовании, что исключает щели, мостики холода и обеспечивает правильную геометрию стен. Утепление и пароизоляция укладываются по технологии без риска намокания утеплителя во время открытой стройки.',
  },
  {
    image: '/images/why-speed.jpg',
    title: 'Максимальная скорость возведения',
    description:
      'Параллельно с подготовкой фундамента (чаще всего легкого свайного) на заводе идет производство самих модулей. На вашем участке готовый дом собирается «под ключ» буквально за несколько дней. Заселиться можно сразу после подключения коммуникаций.',
  },
  {
    image: '/images/why-clean.jpg',
    title: 'Чистота на участке',
    description:
      'Все отходы от распила материалов остаются на производстве, а не на вашем газоне. Крупная строительная техника не разбивает подъездные пути, так как дом привозят уже в готовом виде или крупными панелями для финальной стыковки.',
  },
  {
    image: '/images/why-scale.jpg',
    title: 'Масштабируемость и мобильность',
    description:
      'Вы можете начать с небольшого дачного домика (из 1–2 модулей), а через несколько лет добавить к нему спальню, детскую или баню, пристроив новые блоки. В отличие от обычного каркасного дома, модульный дом можно демонтировать, перевезти на другой участок и собрать заново.',
  },
];

export function WhyModularSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.reason-card');
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
        stagger: 0.12,
      }
    );

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="reason-card group overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
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
                <h3 className="font-display text-2xl font-medium text-[#2C2C2C]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#6B6B6B]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
