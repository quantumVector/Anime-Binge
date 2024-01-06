import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  text?: string;
  icon?: ReactNode;
}

export const Button = ({ text }: ButtonProps) => {
  return (
    <button className={styles.button}>{text}</button>
  )
}