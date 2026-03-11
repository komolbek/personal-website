import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

function formatDate(date: Date | string | null) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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

export function ContractPDF({ contract }: { contract: ContractData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Necto Automations</Text>
          <Text style={styles.title}>Service Agreement</Text>
          <Text style={styles.subtitle}>{contract.projectName}</Text>
        </View>

        <Text style={styles.sectionTitle}>1. Parties</Text>
        <Text style={styles.paragraph}>
          This Service Agreement is entered into between:
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Service Provider:</Text>
          <Text style={styles.infoValue}>Necto Automations LLC</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Client:</Text>
          <Text style={styles.infoValue}>{contract.clientName}</Text>
        </View>
        {contract.clientContact && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact Person:</Text>
            <Text style={styles.infoValue}>{contract.clientContact}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>2. Scope of Work</Text>
        <Text style={styles.paragraph}>
          {contract.scopeDescription || 'As discussed and agreed upon between both parties.'}
        </Text>

        <Text style={styles.sectionTitle}>3. Pricing</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Price:</Text>
          <Text style={[styles.infoValue, { fontFamily: 'Helvetica-Bold' }]}>
            {formatCurrency(contract.totalPrice, contract.currency)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>4. Payment Terms</Text>
        <Text style={styles.paragraph}>
          {contract.paymentTerms || '50% upfront upon signing, 50% upon project delivery and acceptance.'}
        </Text>

        <Text style={styles.sectionTitle}>5. Timeline</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Start Date:</Text>
          <Text style={styles.infoValue}>{formatDate(contract.startDate)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Deadline:</Text>
          <Text style={styles.infoValue}>{formatDate(contract.deadline)}</Text>
        </View>

        <Text style={styles.sectionTitle}>6. Terms & Conditions</Text>
        <Text style={styles.paragraph}>
          a) The Service Provider will deliver the project as described in the scope of work above.
        </Text>
        <Text style={styles.paragraph}>
          b) The Client agrees to provide all necessary content, assets, and feedback in a timely manner.
        </Text>
        <Text style={styles.paragraph}>
          c) Changes to the scope after signing may result in additional costs and timeline adjustments.
        </Text>
        <Text style={styles.paragraph}>
          d) The Service Provider retains intellectual property rights until full payment is received.
        </Text>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>Service Provider</Text>
            <Text>Necto Automations LLC</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Signature & Date</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>Client</Text>
            <Text>{contract.clientName}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Signature & Date</Text>
          </View>
        </View>

        {contract.signedDate && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 10, color: '#16a34a' }}>
              Signed on {formatDate(contract.signedDate)}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Necto Automations LLC | necto.uz | Generated {formatDate(contract.createdAt)}</Text>
        </View>
      </Page>
    </Document>
  );
}
