import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { CommonIcons } from '@/shared/ui/icons';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {

  return (
    <>
      <main className={styles.main}>{children}</main>
      <CommonIcons />
    </>
  );
}
