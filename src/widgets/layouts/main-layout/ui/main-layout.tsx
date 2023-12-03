import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { Footer } from '@/entities/footer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {

  return (
    <>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
