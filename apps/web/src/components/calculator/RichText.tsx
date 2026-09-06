import { Fragment } from 'react';

/**
 * Renders the **bold** spans used in the calculator copy. The alternative was
 * HTML strings in src/config/calculator.ts behind dangerouslySetInnerHTML;
 * this keeps the data plain text.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
