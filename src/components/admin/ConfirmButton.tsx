'use client';

interface ConfirmButtonProps {
  children: React.ReactNode;
  message?: string;
  className?: string;
  title?: string;
}

export function ConfirmButton({
  children,
  message = 'Are you sure?',
  className,
  title,
}: ConfirmButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      title={title}
      onClick={(e) => {
        if (!confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
