import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo & Description */}
          <div>
            <div className="flex items-center gap-3">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="16" width="40" height="28" rx="2" fill="#FFFFFF" />
                <path d="M4 16L24 4L44 16" fill="#FFFFFF" />
                <rect x="18" y="8" width="6" height="10" rx="1" fill="#FFFFFF" />
                <rect x="20" y="4" width="4" height="6" rx="1" fill="#C4703F" />
                <rect x="12" y="24" width="10" height="20" rx="1" fill="#2C2C2C" opacity="0.2" />
                <rect x="26" y="24" width="10" height="20" rx="1" fill="#2C2C2C" opacity="0.2" />
                <rect x="18" y="6" width="8" height="2" rx="0.5" fill="#C4703F" opacity="0.6" />
              </svg>
              <span className="text-lg font-semibold text-white">ЭкоБаня</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Модульные бани премиум-класса. Производство, доставка и монтаж по всей России.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-white">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Главная', path: '/' },
                { label: 'О компании', path: '/about' },
                { label: 'Производство', path: '/production' },
                { label: 'Каталог', path: '/catalog' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/60 transition-colors duration-250 hover:text-[#C4703F]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contacts */}
          <div>
            <h4 className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-white">
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+78005553535" className="flex items-center gap-2 text-sm text-white/60 transition-colors duration-250 hover:text-[#C4703F]">
                <Phone size={16} />
                +7 (800) 555-35-35
              </a>
              <a href="mailto:info@ecobanya.ru" className="flex items-center gap-2 text-sm text-white/60 transition-colors duration-250 hover:text-[#C4703F]">
                <Mail size={16} />
                info@ecobanya.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                Тульская область, г. Новомосковск, промзона «Строитель»
              </div>
            </div>
          </div>

          {/* Col 4: Social */}
          <div>
            <h4 className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-white">
              Мы в соцсетях
            </h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-250 hover:bg-[#C4703F]">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-250 hover:bg-[#C4703F]">
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/40">
              © 2025 ЭкоБаня. Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-xs text-white/40 transition-colors duration-250 hover:text-[#C4703F]">
                Политика конфиденциальности
              </Link>
              <Link to="/consent" className="text-xs text-white/40 transition-colors duration-250 hover:text-[#C4703F]">
                Согласие на обработку данных
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
