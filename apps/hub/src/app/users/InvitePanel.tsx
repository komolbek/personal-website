'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import { UserPlus, Copy, Check, Link2, Trash2 } from 'lucide-react';

interface PendingInvite {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
}

export function InvitePanel({ invitations }: { invitations: PendingInvite[] }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MANAGER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLink('');
    setCopied(false);
    setLoading(true);
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create invitation');
        return;
      }
      setLink(data.link);
      setEmail('');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function copyLink(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. non-HTTPS); the link is still selectable.
    }
  }

  async function revoke(id: string) {
    if (!confirm('Revoke this invitation? The link will stop working.')) return;
    const res = await fetch(`/api/invitations/${id}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Invite a user
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleInvite} className="grid gap-4 sm:grid-cols-[1fr_180px_auto] sm:items-end">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cofounder@necto.uz"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'ADMIN', label: 'Admin' },
                  { value: 'MANAGER', label: 'Manager' },
                  { value: 'VIEWER', label: 'Viewer' },
                ]}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create invite link'}
            </Button>
          </form>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {link && (
            <div className="rounded-md border bg-muted/40 p-3 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Link2 className="h-4 w-4" /> Invite link created
              </p>
              <p className="text-xs text-muted-foreground">
                Share this link with the invitee. It expires in 7 days and can be used once.
              </p>
              <div className="flex gap-2">
                <Input value={link} readOnly onFocus={(e) => e.currentTarget.select()} className="text-xs" />
                <Button type="button" variant="outline" onClick={() => copyLink(link)}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending invitations ({invitations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending invitations.</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Role</th>
                    <th className="text-left p-3 font-medium">Expires</th>
                    <th className="p-3 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((inv) => (
                    <tr key={inv.id} className="border-b">
                      <td className="p-3 font-medium">{inv.email}</td>
                      <td className="p-3"><StatusBadge status={inv.role} /></td>
                      <td className="p-3">{formatDate(inv.expiresAt)}</td>
                      <td className="p-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive h-7 text-xs"
                          onClick={() => revoke(inv.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Revoke
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
