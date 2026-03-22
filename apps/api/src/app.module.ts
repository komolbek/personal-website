import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProductsModule } from './products/products.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { PartnersModule } from './partners/partners.module.js';
import { FeedbackModule } from './feedback/feedback.module.js';
import { BlogModule } from './blog/blog.module.js';
import { ContactsModule } from './contacts/contacts.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { PagesModule } from './pages/pages.module.js';
import { TelegramModule } from './telegram/telegram.module.js';
import { TranslateModule } from './translate/translate.module.js';
import { HubClientsModule } from './hub-clients/hub-clients.module.js';
import { HubLeadsModule } from './hub-leads/hub-leads.module.js';
import { HubQuotesModule } from './hub-quotes/hub-quotes.module.js';
import { HubProjectsModule } from './hub-projects/hub-projects.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    HealthModule,
    AuthModule,
    ProductsModule,
    ProjectsModule,
    PartnersModule,
    FeedbackModule,
    BlogModule,
    ContactsModule,
    SettingsModule,
    PagesModule,
    TelegramModule,
    TranslateModule,
    HubClientsModule,
    HubLeadsModule,
    HubQuotesModule,
    HubProjectsModule,
  ],
})
export class AppModule {}
