'use client';

import { useState, useRef } from 'react';
import { Modal } from './Modal';

interface ConfirmButtonProps {
  children: React.ReactNode;
  message?: string;
  title?: string;
  className?: string;
}

export function ConfirmButton({
  children,
  message = 'Are you sure?',
  title = 'Confirm Action',
  className,
}: ConfirmButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          const form = buttonRef.current?.closest('form');
          if (form) {
            form.requestSubmit();
          }
        }}
        title={title}
        message={message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}
