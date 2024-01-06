import { HTMLAttributes, PropsWithChildren, forwardRef, createElement } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export type TypoTagNameType = keyof Omit<
  JSX.IntrinsicElements,
  Exclude<keyof SVGElementTagNameMap, 'a'>
>;

export type TypoDesignToken =
  | 'header-xl'
  | 'header-l-menu'
  | 'header-l'
  | 'header-m'
  | 'header-s'
  | 'accent'
  | 'text-m'
  | 'text-m-medium'
  | 'text-s'
  | 'text-button';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: TypoTagNameType;
  design?: TypoDesignToken;
  raw?: string;
  href?: string;
  target?: '_blank' | '_self';
  notSelectText?: boolean;
}

export const Typo = forwardRef<HTMLElement, PropsWithChildren<TypographyProps>>(
  ({ as: Tag = 'div', design = 'text-m', raw, className, children, notSelectText, ...rest }, ref) =>
    createElement(
      Tag,
      {
        ref,
        className: clsx(styles[design], className, notSelectText && styles.notSelectText),
        ...rest,
        ...(raw ? { dangerouslySetInnerHTML: { __html: raw } } : {}),
      },
      !raw ? children : null,
    ),
);

Typo.displayName = 'Typo';
