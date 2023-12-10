'use client'

import styles from './styles.module.scss';
import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...rest }, ref) => (
        <div className={styles.inputWrapper}>
            <input
                className={clsx(className, styles.input, error && styles.error)}
                type='text'
                ref={ref}
                {...rest}
            />
            {typeof error === 'string' && (
                <p>{error}</p>
            )}
        </div>
    ),
);

Input.displayName = 'Input';