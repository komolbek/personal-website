import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Locale } from '@/lib/i18n/config';
import { intlLocale } from '@/lib/utils';
import type { TFunction } from '@/lib/i18n/translate';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { marginBottom: 30 },
  companyName: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#4f46e5' },
  title: { fontSize: 22, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#666' },
  sectionTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 8, marginTop: 24, borderBottomWidth: 1, borderColor: '#e5e7eb', paddingBottom: 4 },
  paragraph: { lineHeight: 1.6, marginBottom: 8 },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoLabel: { width: 120, color: '#666', fontFamily: 'Helvetica-Bold' },
  infoValue: { flex: 1 },
  signatureBlock: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBox: { width: '45%' },
  signatureLine: { borderBottomWidth: 1, borderColor: '#000', marginTop: 40, marginBottom: 4 },
  signatureLabel: { fontSize: 9, color: '#666' },
  footer: { position: 'absolute' as const, bottom: 40, left: 40, right: 40, textAlign: 'center' as const, fontSize: 9, color: '#999', borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 10 },
});

function formatCurrency(amount: number, currency: string = 'USD') {
  if (currency === 'UZS') return `${amount.toLocaleString()} UZS`;
  return `$${amount.toLocaleString()}`;
}

function formatDate(date: Date | string | null, locale: Locale) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString(intlLocale(locale), { month: 'long', day: 'numeric', year: 'numeric' });
}

type ContractData = {
  clientName: string;
  clientContact: string | null;
  projectName: string;
  scopeDescription: string | null;
  totalPrice: number;
  currency: string;
  paymentTerms: string | null;
  startDate: Date | null;
  deadline: Date | null;
  signedDate: Date | null;
  createdAt: Date;
};

export function ContractPDF({ contract, t, locale }: { contract: ContractData; t: TFunction; locale: Locale }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Necto Automations</Text>
          <Text style={styles.title}>{t('pdf.contract.title')}</Text>
          <Text style={styles.subtitle}>{contract.projectName}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('pdf.contract.parties')}</Text>
        <Text style={styles.paragraph}>
          {t('pdf.contract.partiesIntro')}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('pdf.contract.serviceProvider')}:</Text>
          <Text style={styles.infoValue}>Necto Automations LLC</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('pdf.contract.client')}:</Text>
          <Text style={styles.infoValue}>{contract.clientName}</Text>
        </View>
        {contract.clientContact && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('pdf.contract.contactPerson')}:</Text>
            <Text style={styles.infoValue}>{contract.clientContact}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>{t('pdf.contract.scope')}</Text>
        <Text style={styles.paragraph}>
          {contract.scopeDescription || t('pdf.contract.scopeDefault')}
        </Text>

        <Text style={styles.sectionTitle}>{t('pdf.contract.pricing')}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('pdf.contract.totalPrice')}:</Text>
          <Text style={[styles.infoValue, { fontFamily: 'Helvetica-Bold' }]}>
            {formatCurrency(contract.totalPrice, contract.currency)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{t('pdf.contract.paymentTerms')}</Text>
        <Text style={styles.paragraph}>
          {contract.paymentTerms || t('pdf.contract.paymentTermsDefault')}
        </Text>

        <Text style={styles.sectionTitle}>{t('pdf.contract.timeline')}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('pdf.contract.startDate')}:</Text>
          <Text style={styles.infoValue}>{formatDate(contract.startDate, locale)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('pdf.contract.deadline')}:</Text>
          <Text style={styles.infoValue}>{formatDate(contract.deadline, locale)}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('pdf.contract.terms')}</Text>
        <Text style={styles.paragraph}>{t('pdf.contract.termA')}</Text>
        <Text style={styles.paragraph}>{t('pdf.contract.termB')}</Text>
        <Text style={styles.paragraph}>{t('pdf.contract.termC')}</Text>
        <Text style={styles.paragraph}>{t('pdf.contract.termD')}</Text>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>{t('pdf.contract.serviceProvider')}</Text>
            <Text>Necto Automations LLC</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{t('pdf.contract.signatureDate')}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>{t('pdf.contract.client')}</Text>
            <Text>{contract.clientName}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{t('pdf.contract.signatureDate')}</Text>
          </View>
        </View>

        {contract.signedDate && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 10, color: '#16a34a' }}>
              {t('pdf.contract.signedOn', { date: formatDate(contract.signedDate, locale) })}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>{t('pdf.contract.footer', { date: formatDate(contract.createdAt, locale) })}</Text>
        </View>
      </Page>
    </Document>
  );
}
