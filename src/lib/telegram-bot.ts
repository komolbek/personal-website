import { Bot, InlineKeyboard, Context } from 'grammy';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Session state for each user
interface UserSession {
  step: 'name' | 'service' | 'budget' | 'description' | 'phone' | 'done';
  name?: string;
  service?: string;
  budget?: string;
  description?: string;
  phone?: string;
  lang: 'en' | 'ru' | 'uz';
}

const sessions = new Map<number, UserSession>();

// Translations
const i18n = {
  en: {
    welcome: "Welcome to Necto Automations!\n\nWe build software that transforms businesses — from legal practice management to education platforms.\n\nLet's discuss your project. I'll ask a few quick questions to understand your needs.",
    askName: "What's your name?",
    askService: "Great to meet you, {name}! What service are you interested in?",
    askBudget: "What's your estimated budget for this project?",
    askDescription: "Please briefly describe your project — goals, features, or any ideas you have in mind.",
    askPhone: "Almost done! How can we reach you? Please share your phone number or click the button below.",
    shareContact: "Share my phone number",
    thankYou: "Thank you, {name}! We've received your inquiry.\n\nHere's a summary:\n- Service: {service}\n- Budget: {budget}\n- Project: {description}\n\nOur team will get back to you within 24 hours. You can also reach us at:\n\nPhone: +998 77 070 72 70\nEmail: info@necto.uz",
    services: {
      webdev: 'Web Development',
      mobile: 'Mobile Development',
      crm: 'CRM / ERP Systems',
      uiux: 'UI/UX Design',
      ai: 'AI Integration',
      consulting: 'IT Consulting',
    },
    budgets: {
      small: 'Under $5,000',
      medium: '$5,000 – $15,000',
      large: '$15,000 – $50,000',
      enterprise: '$50,000+',
    },
    restart: 'Start a new inquiry',
    error: "Something went wrong. Please try again or contact us directly at +998 77 070 72 70.",
  },
  ru: {
    welcome: "Добро пожаловать в Necto Automations!\n\nМы создаём программное обеспечение, которое трансформирует бизнес — от систем управления юридической практикой до образовательных платформ.\n\nДавайте обсудим ваш проект. Я задам несколько коротких вопросов, чтобы понять ваши потребности.",
    askName: "Как вас зовут?",
    askService: "Приятно познакомиться, {name}! Какая услуга вас интересует?",
    askBudget: "Какой примерный бюджет вы рассматриваете для этого проекта?",
    askDescription: "Пожалуйста, кратко опишите ваш проект — цели, функции или любые идеи.",
    askPhone: "Почти готово! Как мы можем с вами связаться? Поделитесь номером телефона или нажмите кнопку ниже.",
    shareContact: "Поделиться номером телефона",
    thankYou: "Спасибо, {name}! Мы получили вашу заявку.\n\nРезюме:\n- Услуга: {service}\n- Бюджет: {budget}\n- Проект: {description}\n\nНаша команда свяжется с вами в течение 24 часов. Также вы можете связаться с нами:\n\nТелефон: +998 77 070 72 70\nEmail: info@necto.uz",
    services: {
      webdev: 'Веб-разработка',
      mobile: 'Мобильная разработка',
      crm: 'CRM / ERP системы',
      uiux: 'UI/UX дизайн',
      ai: 'ИИ-интеграция',
      consulting: 'IT-консалтинг',
    },
    budgets: {
      small: 'До $5,000',
      medium: '$5,000 – $15,000',
      large: '$15,000 – $50,000',
      enterprise: '$50,000+',
    },
    restart: 'Новая заявка',
    error: "Что-то пошло не так. Пожалуйста, попробуйте ещё раз или свяжитесь с нами напрямую: +998 77 070 72 70.",
  },
  uz: {
    welcome: "Necto Automations-ga xush kelibsiz!\n\nBiz bizneslarni o'zgartiradigan dasturiy ta'minot yaratamiz — yuridik amaliyotni boshqarish tizimlaridan ta'lim platformalarigacha.\n\nKeling, loyihangizni muhokama qilaylik. Ehtiyojlaringizni tushunish uchun bir nechta tezkor savollar beraman.",
    askName: "Ismingiz nima?",
    askService: "Tanishganimdan xursandman, {name}! Qaysi xizmat sizni qiziqtiradi?",
    askBudget: "Bu loyiha uchun taxminiy byudjetingiz qancha?",
    askDescription: "Iltimos, loyihangizni qisqacha tasvirlab bering — maqsadlar, funksiyalar yoki har qanday g'oyalar.",
    askPhone: "Deyarli tayyor! Qanday qilib siz bilan bog'lanishimiz mumkin? Telefon raqamingizni yuboring yoki quyidagi tugmani bosing.",
    shareContact: "Telefon raqamimni ulashish",
    thankYou: "Rahmat, {name}! Biz sizning so'rovingizni oldik.\n\nXulosa:\n- Xizmat: {service}\n- Byudjet: {budget}\n- Loyiha: {description}\n\nBizning jamoa 24 soat ichida siz bilan bog'lanadi. Shuningdek, biz bilan bog'lanishingiz mumkin:\n\nTelefon: +998 77 070 72 70\nEmail: info@necto.uz",
    services: {
      webdev: 'Veb-ishlab chiqish',
      mobile: 'Mobil ishlab chiqish',
      crm: 'CRM / ERP tizimlar',
      uiux: 'UI/UX dizayn',
      ai: 'AI integratsiya',
      consulting: 'IT maslahat',
    },
    budgets: {
      small: "$5,000 gacha",
      medium: '$5,000 – $15,000',
      large: '$15,000 – $50,000',
      enterprise: '$50,000+',
    },
    restart: "Yangi so'rov",
    error: "Nimadir xato ketdi. Qaytadan urinib ko'ring yoki bizga to'g'ridan-to'g'ri qo'ng'iroq qiling: +998 77 070 72 70.",
  },
};

function detectLanguage(languageCode?: string): 'en' | 'ru' | 'uz' {
  if (!languageCode) return 'en';
  if (languageCode.startsWith('ru')) return 'ru';
  if (languageCode.startsWith('uz')) return 'uz';
  return 'en';
}

function getTexts(lang: 'en' | 'ru' | 'uz') {
  return i18n[lang];
}

function getSession(userId: number, lang?: 'en' | 'ru' | 'uz'): UserSession {
  if (!sessions.has(userId)) {
    sessions.set(userId, { step: 'name', lang: lang || 'en' });
  }
  return sessions.get(userId)!;
}

export function createBot(token: string): Bot {
  const bot = new Bot(token);

  // /start command
  bot.command('start', async (ctx: Context) => {
    const userId = ctx.from?.id;
    if (!userId) return;

    const lang = detectLanguage(ctx.from?.language_code);
    sessions.set(userId, { step: 'name', lang });
    const texts = getTexts(lang);

    await ctx.reply(texts.welcome + '\n\n' + texts.askName);
  });

  // Handle contact sharing
  bot.on('message:contact', async (ctx: Context) => {
    const userId = ctx.from?.id;
    if (!userId) return;

    const session = getSession(userId);
    if (session.step !== 'phone') return;

    const contact = ctx.message?.contact;
    if (contact) {
      session.phone = contact.phone_number;
      session.step = 'done';

      const texts = getTexts(session.lang);
      const thankYouMsg = texts.thankYou
        .replace('{name}', session.name || '')
        .replace('{service}', session.service || '')
        .replace('{budget}', session.budget || '')
        .replace('{description}', session.description || '');

      const keyboard = new InlineKeyboard().text(texts.restart, 'restart');
      await ctx.reply(thankYouMsg, { reply_markup: keyboard });

      // Notify admin
      await saveAndNotify(bot, session);
    }
  });

  // Handle callback queries (button clicks)
  bot.on('callback_query:data', async (ctx: Context) => {
    const userId = ctx.from?.id;
    if (!userId) return;

    const data = ctx.callbackQuery?.data;
    if (!data) return;

    await ctx.answerCallbackQuery();

    if (data === 'restart') {
      const lang = detectLanguage(ctx.from?.language_code);
      sessions.set(userId, { step: 'name', lang });
      const texts = getTexts(lang);
      await ctx.reply(texts.welcome + '\n\n' + texts.askName);
      return;
    }

    const session = getSession(userId);
    const texts = getTexts(session.lang);

    if (session.step === 'service') {
      const serviceKey = data as keyof typeof texts.services;
      session.service = texts.services[serviceKey] || data;
      session.step = 'budget';

      const budgetKeyboard = new InlineKeyboard()
        .text(texts.budgets.small, 'small').row()
        .text(texts.budgets.medium, 'medium').row()
        .text(texts.budgets.large, 'large').row()
        .text(texts.budgets.enterprise, 'enterprise');

      await ctx.reply(texts.askBudget, { reply_markup: budgetKeyboard });
    } else if (session.step === 'budget') {
      const budgetKey = data as keyof typeof texts.budgets;
      session.budget = texts.budgets[budgetKey] || data;
      session.step = 'description';

      await ctx.reply(texts.askDescription);
    }
  });

  // Handle text messages
  bot.on('message:text', async (ctx: Context) => {
    const userId = ctx.from?.id;
    const text = ctx.message?.text;
    if (!userId || !text) return;

    // Skip commands
    if (text.startsWith('/')) return;

    const session = getSession(userId, detectLanguage(ctx.from?.language_code));
    const texts = getTexts(session.lang);

    try {
      switch (session.step) {
        case 'name': {
          session.name = text.trim();
          session.step = 'service';

          const serviceKeyboard = new InlineKeyboard()
            .text(texts.services.webdev, 'webdev').row()
            .text(texts.services.mobile, 'mobile').row()
            .text(texts.services.crm, 'crm').row()
            .text(texts.services.uiux, 'uiux').row()
            .text(texts.services.ai, 'ai').row()
            .text(texts.services.consulting, 'consulting');

          await ctx.reply(
            texts.askService.replace('{name}', session.name),
            { reply_markup: serviceKeyboard }
          );
          break;
        }

        case 'description': {
          session.description = text.trim();
          session.step = 'phone';

          await ctx.reply(texts.askPhone, {
            reply_markup: {
              keyboard: [[{ text: texts.shareContact, request_contact: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          });
          break;
        }

        case 'phone': {
          // User typed phone number manually instead of sharing contact
          session.phone = text.trim();
          session.step = 'done';

          const thankYouMsg = texts.thankYou
            .replace('{name}', session.name || '')
            .replace('{service}', session.service || '')
            .replace('{budget}', session.budget || '')
            .replace('{description}', session.description || '');

          const keyboard = new InlineKeyboard().text(texts.restart, 'restart');
          await ctx.reply(thankYouMsg, {
            reply_markup: keyboard,
          });

          // Remove the custom keyboard
          await ctx.reply('.', {
            reply_markup: { remove_keyboard: true },
          }).then(msg => {
            // Delete the dot message
            ctx.api.deleteMessage(ctx.chat!.id, msg.message_id).catch(() => {});
          });

          // Notify admin
          await saveAndNotify(bot, session);
          break;
        }

        case 'done': {
          const keyboard = new InlineKeyboard().text(texts.restart, 'restart');
          await ctx.reply(texts.askName, { reply_markup: keyboard });
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error('Bot error:', error);
      await ctx.reply(texts.error);
    }
  });

  return bot;
}

async function saveAndNotify(bot: Bot, session: UserSession) {
  // Save to database
  try {
    await prisma.contactSubmission.create({
      data: {
        name: session.name || '',
        phone: session.phone || '',
        service: session.service,
        budget: session.budget,
        message: session.description || '',
        source: 'telegram',
      },
    });
  } catch (error) {
    console.error('Failed to save inquiry to database:', error);
  }

  // Notify admin via Telegram
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!adminChatId) return;

  const message = `New inquiry from Telegram bot:

Name: ${session.name}
Service: ${session.service}
Budget: ${session.budget}
Phone: ${session.phone}

Project description:
${session.description}`;

  try {
    await bot.api.sendMessage(adminChatId, message);
  } catch (error) {
    console.error('Failed to notify admin:', error);
  }
}

// Singleton bot instance
let botInstance: Bot | null = null;
let botInitialized = false;

export function getBot(): Bot {
  if (!botInstance) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set');
    }
    botInstance = createBot(token);
  }
  return botInstance;
}

export async function ensureBotInitialized(): Promise<Bot> {
  const bot = getBot();
  if (!botInitialized) {
    await bot.init();
    botInitialized = true;
  }
  return bot;
}
