import type { Locale } from './config';
import type { Dictionary } from './translate';

// Flat, dot-namespaced keys. `enum.*` keys map raw Prisma enum values
// (e.g. IN_PROGRESS, ADMIN) to localized labels for StatusBadge and selects.

const en: Dictionary = {
  // Brand / shell
  'brand.title': 'Necto Hub',
  'brand.subtitle': 'Business Management',

  // Navigation
  'nav.dashboard': 'Dashboard',
  'nav.projects': 'Projects',
  'nav.products': 'Products',
  'nav.finances': 'Finances',
  'nav.contacts': 'Contacts',
  'nav.users': 'Users & Roles',
  'nav.settings': 'Settings',
  'nav.logout': 'Logout',

  // Common
  'common.name': 'Name',
  'common.email': 'Email',
  'common.phone': 'Phone',
  'common.password': 'Password',
  'common.role': 'Role',
  'common.status': 'Status',
  'common.type': 'Type',
  'common.date': 'Date',
  'common.amount': 'Amount',
  'common.currency': 'Currency',
  'common.category': 'Category',
  'common.notes': 'Notes',
  'common.description': 'Description',
  'common.company': 'Company',
  'common.telegram': 'Telegram',
  'common.instagram': 'Instagram',
  'common.address': 'Address',
  'common.source': 'Source',
  'common.total': 'Total',
  'common.deadline': 'Deadline',
  'common.actions': 'Actions',
  'common.joined': 'Joined',
  'common.add': 'Add',
  'common.edit': 'Edit',
  'common.save': 'Save',
  'common.saveChanges': 'Save changes',
  'common.cancel': 'Cancel',
  'common.delete': 'Delete',
  'common.remove': 'Remove',
  'common.close': 'Close',
  'common.create': 'Create',
  'common.viewAll': 'View all',
  'common.loading': 'Loading...',
  'common.saving': 'Saving...',
  'common.somethingWrong': 'Something went wrong',
  'common.noPermission': 'You do not have permission to do this',
  'common.you': '(you)',
  'common.optional': 'optional',

  // Auth / login
  'auth.signInTitle': 'Necto Hub',
  'auth.signInSubtitle': 'Sign in to your account',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.signIn': 'Sign in',
  'auth.signingIn': 'Signing in...',
  'auth.loginFailed': 'Login failed',

  // Dashboard
  'dashboard.title': 'Dashboard',
  'dashboard.welcome': 'Welcome back',
  'dashboard.totalEarned': 'Total Earned',
  'dashboard.outstanding': 'Outstanding',
  'dashboard.activeProjects': 'Active Projects',
  'dashboard.monthPL': 'This Month P&L',
  'dashboard.alerts': 'Alerts',
  'dashboard.revenue6mo': 'Revenue (Last 6 Months)',
  'dashboard.projectPipeline': 'Project Pipeline',
  'dashboard.recentActivity': 'Recent Activity',
  'dashboard.financialSummary': 'Financial Summary',
  'dashboard.checkOverdue': 'Check Overdue',
  'dashboard.noActivity': 'No recent activity',

  // Settings
  'settings.title': 'Settings',
  'settings.subtitle': 'Manage your account',
  'settings.yourProfile': 'Your Profile',
  'settings.usersAndRoles': 'Users & Roles',
  'settings.manageUsersHint': 'Invite teammates, assign roles, and manage access from the Users & Roles page.',
  'settings.manageUsers': 'Manage users',

  // Users
  'users.title': 'Users & Roles',
  'users.subtitle': 'Create teammate accounts and manage their access',
  'users.addUser': 'Add user',
  'users.fullNamePlaceholder': 'Full name',
  'users.emailPlaceholder': 'user@necto.uz',
  'users.shareHint': 'Share the email and password with the user; they sign in on the login page.',
  'users.teamMembers': 'Team members',
  'users.remove': 'Remove',

  // Enum labels — user roles
  'enum.ADMIN': 'Admin',
  'enum.MANAGER': 'Manager',
  'enum.VIEWER': 'Viewer',
  // Project statuses
  'enum.LEAD': 'Lead',
  'enum.PROPOSAL': 'Proposal',
  'enum.NEGOTIATING': 'Negotiating',
  'enum.IN_PROGRESS': 'In Progress',
  'enum.FROZEN': 'Frozen',
  'enum.DELIVERED': 'Delivered',
  'enum.PAID': 'Paid',
  'enum.LOST': 'Lost',
  // Lead statuses
  'enum.NOT_CONTACTED': 'Not Contacted',
  'enum.CONTACTED': 'Contacted',
  'enum.DEMO_SCHEDULED': 'Demo Scheduled',
  'enum.DEMO_DONE': 'Demo Done',
  'enum.TRIAL': 'Trial',
  'enum.SIGNED': 'Signed',
  // Client payment statuses
  'enum.ACTIVE': 'Active',
  'enum.OVERDUE': 'Overdue',
  'enum.CHURNED': 'Churned',
  // Product statuses
  'enum.PARKED': 'Parked',
  'enum.ARCHIVED': 'Archived',
  // Milestone statuses
  'enum.PENDING': 'Pending',
  'enum.INVOICED': 'Invoiced',
  // Quote / contract statuses
  'enum.DRAFT': 'Draft',
  'enum.SENT': 'Sent',
  'enum.ACCEPTED': 'Accepted',
  'enum.REJECTED': 'Rejected',
  // Contact types
  'enum.CLIENT': 'Client',
  'enum.REFERRAL_SOURCE': 'Referral Source',
  'enum.POTENTIAL': 'Potential',
  'enum.PARTNER': 'Partner',
  // Lead sources
  'enum.WALK_IN': 'Walk-in',
  'enum.REFERRAL': 'Referral',
  'enum.GOOGLE_MAPS': 'Google Maps',
  'enum.TWOGIS': '2GIS',
  'enum.OTHER': 'Other',
  // Contact sources
  'enum.PERSONAL': 'Personal',
  'enum.IT_PARK': 'IT Park',
  'enum.TELEGRAM_GROUP': 'Telegram Group',
  // Payment types / categories
  'enum.INCOME': 'Income',
  'enum.EXPENSE': 'Expense',
  'enum.PROJECT_REVENUE': 'Project Revenue',
  'enum.PRODUCT_REVENUE': 'Product Revenue',
  'enum.HOSTING': 'Hosting',
  'enum.DOMAINS': 'Domains',
  'enum.OFFICE': 'Office',
  'enum.SMS_API': 'SMS / API',
  'enum.MARKETING': 'Marketing',
  'enum.SALARY': 'Salary',
  'enum.TRANSPORT': 'Transport',
  'enum.TOOLS': 'Tools',
  // Currencies / intervals
  'enum.USD': 'USD',
  'enum.UZS': 'UZS',
  'enum.MONTHLY': 'Monthly',
  'enum.YEARLY': 'Yearly',
};

const ru: Dictionary = {
  // Brand / shell
  'brand.title': 'Necto Hub',
  'brand.subtitle': 'Управление бизнесом',

  // Navigation
  'nav.dashboard': 'Дашборд',
  'nav.projects': 'Проекты',
  'nav.products': 'Продукты',
  'nav.finances': 'Финансы',
  'nav.contacts': 'Контакты',
  'nav.users': 'Пользователи и роли',
  'nav.settings': 'Настройки',
  'nav.logout': 'Выйти',

  // Common
  'common.name': 'Имя',
  'common.email': 'Email',
  'common.phone': 'Телефон',
  'common.password': 'Пароль',
  'common.role': 'Роль',
  'common.status': 'Статус',
  'common.type': 'Тип',
  'common.date': 'Дата',
  'common.amount': 'Сумма',
  'common.currency': 'Валюта',
  'common.category': 'Категория',
  'common.notes': 'Заметки',
  'common.description': 'Описание',
  'common.company': 'Компания',
  'common.telegram': 'Telegram',
  'common.instagram': 'Instagram',
  'common.address': 'Адрес',
  'common.source': 'Источник',
  'common.total': 'Итого',
  'common.deadline': 'Срок',
  'common.actions': 'Действия',
  'common.joined': 'Добавлен',
  'common.add': 'Добавить',
  'common.edit': 'Изменить',
  'common.save': 'Сохранить',
  'common.saveChanges': 'Сохранить изменения',
  'common.cancel': 'Отмена',
  'common.delete': 'Удалить',
  'common.remove': 'Удалить',
  'common.close': 'Закрыть',
  'common.create': 'Создать',
  'common.viewAll': 'Показать все',
  'common.loading': 'Загрузка...',
  'common.saving': 'Сохранение...',
  'common.somethingWrong': 'Что-то пошло не так',
  'common.noPermission': 'У вас нет прав на это действие',
  'common.you': '(вы)',
  'common.optional': 'необязательно',

  // Auth / login
  'auth.signInTitle': 'Necto Hub',
  'auth.signInSubtitle': 'Войдите в свою учётную запись',
  'auth.email': 'Email',
  'auth.password': 'Пароль',
  'auth.signIn': 'Войти',
  'auth.signingIn': 'Вход...',
  'auth.loginFailed': 'Не удалось войти',

  // Dashboard
  'dashboard.title': 'Дашборд',
  'dashboard.welcome': 'С возвращением',
  'dashboard.totalEarned': 'Всего заработано',
  'dashboard.outstanding': 'К получению',
  'dashboard.activeProjects': 'Активные проекты',
  'dashboard.monthPL': 'Прибыль за месяц',
  'dashboard.alerts': 'Уведомления',
  'dashboard.revenue6mo': 'Выручка (последние 6 месяцев)',
  'dashboard.projectPipeline': 'Воронка проектов',
  'dashboard.recentActivity': 'Последние действия',
  'dashboard.financialSummary': 'Финансовая сводка',
  'dashboard.checkOverdue': 'Проверить просрочки',
  'dashboard.noActivity': 'Нет недавних действий',

  // Settings
  'settings.title': 'Настройки',
  'settings.subtitle': 'Управление учётной записью',
  'settings.yourProfile': 'Ваш профиль',
  'settings.usersAndRoles': 'Пользователи и роли',
  'settings.manageUsersHint': 'Приглашайте участников, назначайте роли и управляйте доступом на странице «Пользователи и роли».',
  'settings.manageUsers': 'Управление пользователями',

  // Users
  'users.title': 'Пользователи и роли',
  'users.subtitle': 'Создавайте учётные записи и управляйте их доступом',
  'users.addUser': 'Добавить пользователя',
  'users.fullNamePlaceholder': 'Полное имя',
  'users.emailPlaceholder': 'user@necto.uz',
  'users.shareHint': 'Передайте пользователю email и пароль — он войдёт на странице входа.',
  'users.teamMembers': 'Участники команды',
  'users.remove': 'Удалить',

  // Enum labels — user roles
  'enum.ADMIN': 'Администратор',
  'enum.MANAGER': 'Менеджер',
  'enum.VIEWER': 'Наблюдатель',
  // Project statuses
  'enum.LEAD': 'Лид',
  'enum.PROPOSAL': 'Предложение',
  'enum.NEGOTIATING': 'Переговоры',
  'enum.IN_PROGRESS': 'В работе',
  'enum.FROZEN': 'Заморожен',
  'enum.DELIVERED': 'Сдан',
  'enum.PAID': 'Оплачен',
  'enum.LOST': 'Потерян',
  // Lead statuses
  'enum.NOT_CONTACTED': 'Нет контакта',
  'enum.CONTACTED': 'Связались',
  'enum.DEMO_SCHEDULED': 'Демо назначено',
  'enum.DEMO_DONE': 'Демо проведено',
  'enum.TRIAL': 'Пробный период',
  'enum.SIGNED': 'Подписан',
  // Client payment statuses
  'enum.ACTIVE': 'Активен',
  'enum.OVERDUE': 'Просрочен',
  'enum.CHURNED': 'Отток',
  // Product statuses
  'enum.PARKED': 'На паузе',
  'enum.ARCHIVED': 'В архиве',
  // Milestone statuses
  'enum.PENDING': 'Ожидает',
  'enum.INVOICED': 'Выставлен счёт',
  // Quote / contract statuses
  'enum.DRAFT': 'Черновик',
  'enum.SENT': 'Отправлен',
  'enum.ACCEPTED': 'Принят',
  'enum.REJECTED': 'Отклонён',
  // Contact types
  'enum.CLIENT': 'Клиент',
  'enum.REFERRAL_SOURCE': 'Источник рекомендаций',
  'enum.POTENTIAL': 'Потенциальный',
  'enum.PARTNER': 'Партнёр',
  // Lead sources
  'enum.WALK_IN': 'Пришёл сам',
  'enum.REFERRAL': 'Рекомендация',
  'enum.GOOGLE_MAPS': 'Google Maps',
  'enum.TWOGIS': '2ГИС',
  'enum.OTHER': 'Другое',
  // Contact sources
  'enum.PERSONAL': 'Личный',
  'enum.IT_PARK': 'IT Park',
  'enum.TELEGRAM_GROUP': 'Telegram-группа',
  // Payment types / categories
  'enum.INCOME': 'Доход',
  'enum.EXPENSE': 'Расход',
  'enum.PROJECT_REVENUE': 'Доход от проектов',
  'enum.PRODUCT_REVENUE': 'Доход от продуктов',
  'enum.HOSTING': 'Хостинг',
  'enum.DOMAINS': 'Домены',
  'enum.OFFICE': 'Офис',
  'enum.SMS_API': 'SMS / API',
  'enum.MARKETING': 'Маркетинг',
  'enum.SALARY': 'Зарплата',
  'enum.TRANSPORT': 'Транспорт',
  'enum.TOOLS': 'Инструменты',
  // Currencies / intervals
  'enum.USD': 'USD',
  'enum.UZS': 'UZS',
  'enum.MONTHLY': 'Ежемесячно',
  'enum.YEARLY': 'Ежегодно',
};

// Feature fragments authored per area. Each exports `en` and `ru` maps that
// are merged into the base dictionaries below.
import * as projects from './fragments/projects';
import * as products from './fragments/products';
import * as leadsClients from './fragments/leads-clients';
import * as financesContacts from './fragments/finances-contacts';
import * as dashboardShared from './fragments/dashboard-shared';
import * as pdf from './fragments/pdf';
import * as errors from './fragments/errors';

const fragments = [projects, products, leadsClients, financesContacts, dashboardShared, pdf, errors];

export const dictionaries: Record<Locale, Dictionary> = {
  ru: Object.assign({}, ru, ...fragments.map((f) => f.ru)),
  en: Object.assign({}, en, ...fragments.map((f) => f.en)),
};
