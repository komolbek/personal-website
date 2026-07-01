'use client';

import { useRef } from 'react';
import { Select } from '@/components/ui/select';

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

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={userId} />
      <Select
        name="role"
        defaultValue={currentRole}
        className="h-8 w-32 text-xs"
        onChange={() => formRef.current?.requestSubmit()}
        options={[
          { value: 'ADMIN', label: 'Admin' },
          { value: 'MANAGER', label: 'Manager' },
          { value: 'VIEWER', label: 'Viewer' },
        ]}
      />
    </form>
  );
}
