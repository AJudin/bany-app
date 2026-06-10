import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ContactPopup } from './ContactPopup';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);
      setHidden(currentY > lastScrollY.current && currentY > 200);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'О компании', path: '/about' },
    { label: 'Производство', path: '/production' },
    { label: 'Каталог', path: '/catalog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(245, 245, 240, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="16" width="40" height="28" rx="2" fill={scrolled ? '#2C2C2C' : '#FFFFFF'} />
              <path d="M4 16L24 4L44 16" fill={scrolled ? '#2C2C2C' : '#FFFFFF'} />
              <rect x="18" y="8" width="6" height="10" rx="1" fill={scrolled ? '#2C2C2C' : '#FFFFFF'} />
              <rect x="20" y="4" width="4" height="6" rx="1" fill={scrolled ? '#C4703F' : '#C4703F'} />
              <rect x="12" y="24" width="10" height="20" rx="1" fill={scrolled ? '#F5F5F0' : 'rgba(255,255,255,0.2)'} />
              <rect x="26" y="24" width="10" height="20" rx="1" fill={scrolled ? '#F5F5F0' : 'rgba(255,255,255,0.2)'} />
              <rect x="18" y="6" width="8" height="2" rx="0.5" fill={scrolled ? '#C4703F' : '#C4703F'} opacity="0.6" />
            </svg>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: scrolled ? '#2C2C2C' : '#FFFFFF' }}
            >
              ЭкоБаня
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-nav transition-colors duration-250 hover:text-[#C4703F]"
                style={{
                  color: isActive(link.path) ? '#C4703F' : scrolled ? '#2C2C2C' : '#FFFFFF',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+78005553535"
              className="text-sm font-medium transition-colors duration-250 hover:text-[#C4703F]"
              style={{ color: scrolled ? '#2C2C2C' : '#FFFFFF' }}
            >
              +7 (800) 555-35-35
            </a>
            <button
              onClick={() => setPopupOpen(true)}
              className="rounded bg-[#C4703F] px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors duration-250 hover:bg-[#A85A2F]"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={24} color="#2C2C2C" />
            ) : (
              <Menu size={24} color={scrolled ? '#2C2C2C' : '#FFFFFF'} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#F5F5F0]">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-display text-2xl font-medium transition-colors duration-250 hover:text-[#C4703F]"
                style={{ color: isActive(link.path) ? '#C4703F' : '#2C2C2C' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+78005553535"
              className="mt-4 text-lg font-medium text-[#2C2C2C]"
            >
              +7 (800) 555-35-35
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                setPopupOpen(true);
              }}
              className="mt-4 rounded bg-[#C4703F] px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white hover:bg-[#A85A2F]"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}

      {/* Contact Popup */}
      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
