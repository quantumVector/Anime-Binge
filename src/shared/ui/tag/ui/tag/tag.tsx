import React from 'react';
import styles from './styles.module.scss';
import { Typo } from '@/shared/ui/typo';
import { MainNotesTypes } from '@/shared/lib/types';


interface TagProps extends MainNotesTypes.Tag {}

export const Tag = ({ id, text }: TagProps) => {
  return (
    <div className={styles.tag}>
      <Typo as='span' design='text-s' raw={text} />
    </div>
  )
}