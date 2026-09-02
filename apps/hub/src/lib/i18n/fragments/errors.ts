import type { Dictionary } from '../translate';

export const en: Dictionary = {
  'error.title': 'Something went wrong',
  // Deliberately does not claim to know the cause. Next.js replaces server
  // error messages with a generic one in production, so the boundary cannot
  // tell a permission failure apart from any other — see app/error.tsx.
  'error.body':
    'This page could not be loaded, or the action could not be completed. If you were changing something you do not have permission for, that is the most likely reason.',
  'error.retry': 'Try again',
  'error.home': 'Back to dashboard',
  'error.reference': 'Reference: {digest}',
  'error.referenceHint': 'Quote this when checking the server logs.',
};

export const ru: Dictionary = {
  'error.title': 'Что-то пошло не так',
  'error.body':
    'Не удалось загрузить страницу или выполнить действие. Если вы меняли то, на что у вас нет прав, скорее всего причина в этом.',
  'error.retry': 'Повторить',
  'error.home': 'На главную',
  'error.reference': 'Код ошибки: {digest}',
  'error.referenceHint': 'Укажите его при проверке логов сервера.',
};
