import type { Locale } from '@/types';

// Content that belongs to one product and has no field in the Solution model.
//
// Rescued from OrdoDetail.tsx when the seven bespoke detail components were
// replaced by two templates (REDESIGN.md §5). It is the only hand-written copy
// any of them held; everything else came from src/config/solutions.ts and
// src/config/projects.ts already.

export interface ProductStep {
  number: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

const ordoBookingSteps: ProductStep[] = [
  {
    number: 1,
    title: { en: 'Select Service', ru: 'Выберите услугу', uz: 'Xizmatni tanlang' },
    description: {
      en: 'Browse available services and choose the one that fits your needs.',
      ru: 'Просмотрите доступные услуги и выберите подходящую.',
      uz: 'Mavjud xizmatlarni ko\'rib chiqing va o\'zingizga mosini tanlang.',
    },
  },
  {
    number: 2,
    title: { en: 'Choose Provider', ru: 'Выберите специалиста', uz: 'Mutaxassisni tanlang' },
    description: {
      en: 'Pick your preferred service provider based on ratings and availability.',
      ru: 'Выберите предпочитаемого специалиста по рейтингу и доступности.',
      uz: 'Reyting va mavjudlik asosida mutaxassisni tanlang.',
    },
  },
  {
    number: 3,
    title: { en: 'Pick Date & Time', ru: 'Выберите дату и время', uz: 'Sana va vaqtni tanlang' },
    description: {
      en: 'Select a convenient date and time slot from the provider\'s calendar.',
      ru: 'Выберите удобную дату и время из календаря специалиста.',
      uz: 'Mutaxassis kalendaridan qulay sana va vaqtni tanlang.',
    },
  },
  {
    number: 4,
    title: { en: 'Enter Details', ru: 'Введите данные', uz: 'Ma\'lumotlarni kiriting' },
    description: {
      en: 'Fill in your contact information and any special requirements.',
      ru: 'Укажите контактные данные и особые пожелания.',
      uz: 'Aloqa ma\'lumotlaringiz va maxsus talablarni kiriting.',
    },
  },
  {
    number: 5,
    title: { en: 'Confirm Booking', ru: 'Подтвердите бронь', uz: 'Bronni tasdiqlang' },
    description: {
      en: 'Review your booking summary and confirm to receive instant confirmation.',
      ru: 'Проверьте детали бронирования и подтвердите для мгновенного уведомления.',
      uz: 'Bron tafsilotlarini tekshiring va tasdiqlang.',
    },
  },
];

/** Extra "how it works" steps, by product slug. Absent for most products. */
export const PRODUCT_STEPS: Record<string, ProductStep[]> = {
  ordo: ordoBookingSteps,
};
