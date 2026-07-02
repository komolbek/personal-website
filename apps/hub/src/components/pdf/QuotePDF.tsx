import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Locale } from '@/lib/i18n/config';
import { intlLocale } from '@/lib/utils';
import type { TFunction } from '@/lib/i18n/translate';
import { registerPdfFonts } from './fonts';

registerPdfFonts();

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Roboto' },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#666' },
  sectionTitle: { fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoLabel: { width: 100, color: '#666' },
  infoValue: { flex: 1 },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f3f4f6', paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#e5e7eb' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#f3f4f6' },
  colFeature: { flex: 1 },
  colPrice: { width: 80, textAlign: 'right' as const },
  headerText: { fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 10, color: '#374151' },
  totalRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#f9fafb', borderTopWidth: 2, borderColor: '#e5e7eb' },
  totalLabel: { flex: 1, fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 13 },
  totalValue: { width: 80, textAlign: 'right' as const, fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 13 },
  feeRow: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 12 },
  feeLabel: { flex: 1, color: '#666' },
  feeValue: { width: 80, textAlign: 'right' as const },
  footer: { position: 'absolute' as const, bottom: 40, left: 40, right: 40, textAlign: 'center' as const, fontSize: 9, color: '#999', borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 10 },
  companyName: { fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16, color: '#4f46e5' },
});

function formatCurrency(amount: number, currency: string = 'USD') {
  if (currency === 'UZS') return `${amount.toLocaleString()} UZS`;
  return `$${amount.toLocaleString()}`;
}

function formatDate(date: Date | string | null, locale: Locale) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString(intlLocale(locale), { month: 'long', day: 'numeric', year: 'numeric' });
}

type QuoteData = {
  clientName: string;
  clientPhone: string | null;
  projectName: string | null;
  items: { feature: string; price: number; quantity?: number }[];
  basePrice: number;
  totalPrice: number;
  currency: string;
  rushFeeApplied: boolean;
  rushFeePercent: number | null;
  discountPercent: number | null;
  validUntil: Date | null;
  createdAt: Date;
};

export function QuotePDF({ quote, t, locale }: { quote: QuoteData; t: TFunction; locale: Locale }) {
  const rushAmount = quote.rushFeeApplied ? quote.basePrice * ((quote.rushFeePercent || 0) / 100) : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Necto Automations</Text>
          <Text style={styles.title}>{t('pdf.quote.title')}</Text>
          <Text style={styles.subtitle}>{t('pdf.generated', { date: formatDate(quote.createdAt, locale) })}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>{t('pdf.quote.clientInfo')}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('pdf.quote.client')}:</Text>
            <Text style={styles.infoValue}>{quote.clientName}</Text>
          </View>
          {quote.clientPhone && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('pdf.quote.phone')}:</Text>
              <Text style={styles.infoValue}>{quote.clientPhone}</Text>
            </View>
          )}
          {quote.projectName && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('pdf.quote.project')}:</Text>
              <Text style={styles.infoValue}>{quote.projectName}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('pdf.quote.validUntil')}:</Text>
            <Text style={styles.infoValue}>{formatDate(quote.validUntil, locale)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('pdf.quote.itemized')}</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colFeature]}>{t('pdf.quote.feature')}</Text>
            <Text style={[styles.headerText, styles.colPrice]}>{t('pdf.quote.price')}</Text>
          </View>
          {quote.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colFeature}>
                {item.feature}
                {(item.quantity || 1) > 1 ? ` (x${item.quantity})` : ''}
              </Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price, quote.currency)}</Text>
            </View>
          ))}

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>{t('pdf.quote.subtotal')}</Text>
            <Text style={styles.feeValue}>{formatCurrency(quote.basePrice, quote.currency)}</Text>
          </View>

          {quote.rushFeeApplied && (
            <View style={styles.feeRow}>
              <Text style={[styles.feeLabel, { color: '#d97706' }]}>{t('pdf.quote.rushFee')} ({quote.rushFeePercent}%)</Text>
              <Text style={[styles.feeValue, { color: '#d97706' }]}>+{formatCurrency(rushAmount, quote.currency)}</Text>
            </View>
          )}

          {quote.discountPercent && quote.discountPercent > 0 && (
            <View style={styles.feeRow}>
              <Text style={[styles.feeLabel, { color: '#16a34a' }]}>{t('pdf.quote.discount')} ({quote.discountPercent}%)</Text>
              <Text style={[styles.feeValue, { color: '#16a34a' }]}>
                -{formatCurrency(quote.totalPrice * (quote.discountPercent / (100 - quote.discountPercent)), quote.currency)}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('pdf.quote.total')}</Text>
            <Text style={styles.totalValue}>{formatCurrency(quote.totalPrice, quote.currency)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>{t('pdf.quote.footer', { date: formatDate(quote.validUntil, locale) })}</Text>
        </View>
      </Page>
    </Document>
  );
}
