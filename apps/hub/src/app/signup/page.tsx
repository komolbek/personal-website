import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SignupForm } from './SignupForm';

export const dynamic = 'force-dynamic';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  const invitation = token
    ? await prisma.hubInvitation.findUnique({ where: { token } })
    : null;

  const isValid =
    invitation && !invitation.acceptedAt && invitation.expiresAt > new Date();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Necto Hub</CardTitle>
          <CardDescription>
            {isValid ? 'Accept your invitation and create your account' : 'Invitation'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValid ? (
            <SignupForm token={token!} email={invitation!.email} />
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                This invitation link is invalid, has expired, or has already been used.
                Please ask an administrator to send you a new invitation.
              </p>
              <Link href="/login" className="text-sm text-primary underline-offset-4 hover:underline">
                Go to sign in
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
