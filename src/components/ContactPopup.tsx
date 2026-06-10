import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { trpc } from '@/providers/trpc';

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  consent?: string;
}

export function ContactPopup({ open, onClose }: ContactPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err: { message: string }) => {
      setErrors({ ...errors, consent: err.message });
    },
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.phone = 'Введите корректный номер телефона';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email';
      }
    }

    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutation.mutate({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      comment: formData.comment || undefined,
    });
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1, 4)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[500px] rounded-xl bg-white p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#6B6B6B] transition-colors hover:bg-[#F5F5F0] hover:text-[#2C2C2C]"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4A7C59]/10">
              <Check size={32} className="text-[#4A7C59]" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[#2C2C2C]">
              Спасибо!
            </h3>
            <p className="mt-3 text-[#6B6B6B]">
              Мы свяжемся с вами в течение часа.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded bg-[#C4703F] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#A85A2F]"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <span className="text-label text-[#C4703F]">ОСТАВИТЬ ЗАЯВКУ</span>
            <h2 className="mt-3 font-display text-2xl font-medium text-[#2C2C2C]">
              Получите бесплатную консультацию
            </h2>
            <p className="mt-2 text-sm text-[#6B6B6B]">
              Расскажем о вариантах, рассчитаем стоимость и сроки.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full rounded-md border-[1.5px] px-5 py-4 text-base outline-none transition-all ${
                    errors.name
                      ? 'border-[#C44F3F] shadow-[0_0_0_3px_rgba(196,79,63,0.15)]'
                      : 'border-[#E0E0D8] focus:border-[#C4703F] focus:shadow-[0_0_0_3px_rgba(196,112,63,0.15)]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-[#C44F3F]">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                  className={`w-full rounded-md border-[1.5px] px-5 py-4 text-base outline-none transition-all ${
                    errors.phone
                      ? 'border-[#C44F3F] shadow-[0_0_0_3px_rgba(196,79,63,0.15)]'
                      : 'border-[#E0E0D8] focus:border-[#C4703F] focus:shadow-[0_0_0_3px_rgba(196,112,63,0.15)]'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#C44F3F]">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full rounded-md border-[1.5px] px-5 py-4 text-base outline-none transition-all ${
                    errors.email
                      ? 'border-[#C44F3F] shadow-[0_0_0_3px_rgba(196,79,63,0.15)]'
                      : 'border-[#E0E0D8] focus:border-[#C4703F] focus:shadow-[0_0_0_3px_rgba(196,112,63,0.15)]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#C44F3F]">{errors.email}</p>
                )}
              </div>

              {/* Comment */}
              <textarea
                placeholder="Расскажите о вашем проекте..."
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                rows={3}
                className="w-full rounded-md border-[1.5px] border-[#E0E0D8] px-5 py-4 text-base outline-none transition-all focus:border-[#C4703F] focus:shadow-[0_0_0_3px_rgba(196,112,63,0.15)]"
              />

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-[1.5px] transition-colors ${
                      formData.consent
                        ? 'border-[#4A7C59] bg-[#4A7C59]'
                        : 'border-[#E0E0D8]'
                    }`}
                    onClick={() => handleChange('consent', !formData.consent)}
                  >
                    {formData.consent && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-xs leading-relaxed text-[#6B6B6B]">
                    Я согласен на{' '}
                    <a
                      href="/consent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C4703F] underline hover:no-underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      обработку персональных данных
                    </a>{' '}
                    и с{' '}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C4703F] underline hover:no-underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-[#C44F3F]">{errors.consent}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="mt-2 w-full rounded bg-[#C4703F] py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#A85A2F] disabled:opacity-60"
              >
                {mutation.isPending ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
