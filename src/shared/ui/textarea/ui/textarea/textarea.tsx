import React, { forwardRef } from 'react';
import ReactTextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import clsx from 'clsx';
import { Typo } from '@/shared/ui/typo';
import styles from './styles.module.scss';

interface TextareaProps extends TextareaAutosizeProps {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...rest }, ref) => (
    <div className={styles.textareaWrapper}>
      <ReactTextareaAutosize
        ref={ref}
        className={clsx(styles.textarea, error && styles.error, className)}
        {...rest}
      />
      {error && <Typo as="span" design="text-s" className={styles.errorText} raw={error} />}
    </div>
  ),
);

Textarea.displayName = 'Textarea';