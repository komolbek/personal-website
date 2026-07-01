import type { Dictionary } from '../translate';

export const en: Dictionary = {
  // Dashboard — cards & sections (NEW keys not in base dictionary)
  'dashboard.productMetrics': 'Product Metrics',
  'dashboard.noActiveProjects': 'No active projects',
  'dashboard.noActiveProducts': 'No active products',
  'dashboard.daysLeft': '{days} days left',
  'dashboard.daysOverdue': '{days} days overdue',

  // Product metric labels
  'dashboard.metric.leads': 'Leads',
  'dashboard.metric.clients': 'Clients',
  'dashboard.metric.conversion': 'Conv.',
  'dashboard.metric.mrr': 'MRR',

  // Alerts
  'dashboard.alert.deadlineIn': '{name} deadline in {days} days',
  'dashboard.alert.paymentOverdue': '{name} ({product}) payment overdue',
  'dashboard.alert.followUp': 'Follow up with {name} ({product})',

  // Charts
  'charts.income': 'Income',
  'charts.expenses': 'Expenses',
  'charts.totalValue': 'Total Value',
  'charts.projects': 'Projects',
  'charts.noProjects': 'No projects',
  'charts.noData': 'No data yet',

  // Kanban board
  'kanban.followUp': 'Follow-up: {date}',
  'kanban.updating': 'Updating...',
};

export const ru: Dictionary = {
  // Dashboard — cards & sections (NEW keys not in base dictionary)
  'dashboard.productMetrics': 'Метрики продуктов',
  'dashboard.noActiveProjects': 'Нет активных проектов',
  'dashboard.noActiveProducts': 'Нет активных продуктов',
  'dashboard.daysLeft': 'Осталось дней: {days}',
  'dashboard.daysOverdue': 'Просрочено дней: {days}',

  // Product metric labels
  'dashboard.metric.leads': 'Лиды',
  'dashboard.metric.clients': 'Клиенты',
  'dashboard.metric.conversion': 'Конв.',
  'dashboard.metric.mrr': 'MRR',

  // Alerts
  'dashboard.alert.deadlineIn': 'Срок по «{name}» через {days} дн.',
  'dashboard.alert.paymentOverdue': 'У «{name}» ({product}) просрочен платёж',
  'dashboard.alert.followUp': 'Связаться с «{name}» ({product})',

  // Charts
  'charts.income': 'Доход',
  'charts.expenses': 'Расход',
  'charts.totalValue': 'Общая сумма',
  'charts.projects': 'Проекты',
  'charts.noProjects': 'Нет проектов',
  'charts.noData': 'Пока нет данных',

  // Kanban board
  'kanban.followUp': 'Напоминание: {date}',
  'kanban.updating': 'Обновление...',
};
