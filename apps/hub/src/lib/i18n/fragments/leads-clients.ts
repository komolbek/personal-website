import type { Dictionary } from '../translate';

export const en: Dictionary = {
  // Leads — list page
  'leads.title': '{product} - Leads',
  'leads.totalCount': '{count} total leads',
  'leads.empty.title': 'No leads yet',
  'leads.empty.description': 'Start adding potential {product} customers.',

  // Leads — add/edit dialog
  'leads.add': 'Add Lead',
  'leads.editTitle': 'Edit: {name}',
  'leads.businessName': 'Business Name',
  'leads.businessNamePlaceholder': 'e.g., Salon Bella',
  'leads.contactPerson': 'Contact Person',
  'leads.contactPersonPlaceholder': 'Name',
  'leads.telegramPlaceholder': '@username',
  'leads.instagramPlaceholder': '@handle',
  'leads.followUpDate': 'Follow-up Date',
  'leads.notesPlaceholder': 'Initial observations...',

  // Clients — list page
  'clients.title': '{product} - Clients',
  'clients.summary': '{count} clients | MRR: {mrr}',
  'clients.empty.title': 'No clients yet',
  'clients.empty.description': "{product} doesn't have any paying clients yet.",
  'clients.add': 'Add Client',
  'clients.table.name': 'Name',
  'clients.table.plan': 'Plan',
  'clients.table.monthlyFee': 'Monthly Fee',
  'clients.table.status': 'Status',
  'clients.table.lastPayment': 'Last Payment',
  'clients.table.action': 'Action',
  'clients.pay': 'Pay',

  // Clients — add dialog
  'clients.businessName': 'Business Name',
  'clients.businessNamePlaceholder': 'e.g., Seven Salon',
  'clients.contactPerson': 'Contact Person',
  'clients.contactPersonPlaceholder': 'Name',
  'clients.plan': 'Plan',
  'clients.planPlaceholder': 'e.g., Basic, Pro',
  'clients.monthlyFee': 'Monthly Fee',
  'clients.paymentStatus': 'Payment Status',
  'clients.startDate': 'Start Date',

  // Clients — detail page
  'clients.details': 'Client Details',
  'clients.deleteClient': 'Delete Client',
  'clients.summaryTitle': 'Summary',
  'clients.totalPaid': 'Total Paid',
  'clients.clientSince': 'Client Since',
  'clients.convertedFromLead': 'Converted from lead',
  'clients.recordPayment': 'Record Payment',
  'clients.payment.description': 'Description',
  'clients.payment.descriptionPlaceholder': 'Subscription payment',
  'clients.paymentHistory': 'Payment History ({count})',
  'clients.payment.empty.title': 'No payments yet',
  'clients.payment.empty.description': 'Record the first payment for this client.',
};

export const ru: Dictionary = {
  // Leads — list page
  'leads.title': '{product} — Лиды',
  'leads.totalCount': 'Всего лидов: {count}',
  'leads.empty.title': 'Лидов пока нет',
  'leads.empty.description': 'Начните добавлять потенциальных клиентов {product}.',

  // Leads — add/edit dialog
  'leads.add': 'Добавить лид',
  'leads.editTitle': 'Изменить: {name}',
  'leads.businessName': 'Название компании',
  'leads.businessNamePlaceholder': 'напр., Salon Bella',
  'leads.contactPerson': 'Контактное лицо',
  'leads.contactPersonPlaceholder': 'Имя',
  'leads.telegramPlaceholder': '@username',
  'leads.instagramPlaceholder': '@handle',
  'leads.followUpDate': 'Дата контакта',
  'leads.notesPlaceholder': 'Первые наблюдения...',

  // Clients — list page
  'clients.title': '{product} — Клиенты',
  'clients.summary': 'Клиентов: {count} | MRR: {mrr}',
  'clients.empty.title': 'Клиентов пока нет',
  'clients.empty.description': 'У {product} пока нет платящих клиентов.',
  'clients.add': 'Добавить клиента',
  'clients.table.name': 'Имя',
  'clients.table.plan': 'Тариф',
  'clients.table.monthlyFee': 'Ежемесячная плата',
  'clients.table.status': 'Статус',
  'clients.table.lastPayment': 'Последний платёж',
  'clients.table.action': 'Действие',
  'clients.pay': 'Оплата',

  // Clients — add dialog
  'clients.businessName': 'Название компании',
  'clients.businessNamePlaceholder': 'напр., Seven Salon',
  'clients.contactPerson': 'Контактное лицо',
  'clients.contactPersonPlaceholder': 'Имя',
  'clients.plan': 'Тариф',
  'clients.planPlaceholder': 'напр., Basic, Pro',
  'clients.monthlyFee': 'Ежемесячная плата',
  'clients.paymentStatus': 'Статус оплаты',
  'clients.startDate': 'Дата начала',

  // Clients — detail page
  'clients.details': 'Данные клиента',
  'clients.deleteClient': 'Удалить клиента',
  'clients.summaryTitle': 'Сводка',
  'clients.totalPaid': 'Всего оплачено',
  'clients.clientSince': 'Клиент с',
  'clients.convertedFromLead': 'Переведён из лида',
  'clients.recordPayment': 'Записать платёж',
  'clients.payment.description': 'Описание',
  'clients.payment.descriptionPlaceholder': 'Оплата подписки',
  'clients.paymentHistory': 'История платежей ({count})',
  'clients.payment.empty.title': 'Платежей пока нет',
  'clients.payment.empty.description': 'Запишите первый платёж этого клиента.',
};
