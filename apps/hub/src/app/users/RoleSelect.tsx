'use client';

import { useRef } from 'react';
import { Select } from '@/components/ui/select';
import { useI18n } from '@/components/i18n/I18nProvider';

export function RoleSelect({
  userId,
  currentRole,
  action,
}: {
  userId: string;
  currentRole: string;
  action: (formData: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useI18n();

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={userId} />
      <Select
        name="role"
        defaultValue={currentRole}
        className="h-8 w-32 text-xs"
        onChange={() => formRef.current?.requestSubmit()}
        options={[
          { value: 'ADMIN', label: t('enum.ADMIN') },
          { value: 'MANAGER', label: t('enum.MANAGER') },
          { value: 'VIEWER', label: t('enum.VIEWER') },
        ]}
      />
    </form>
  );
}
