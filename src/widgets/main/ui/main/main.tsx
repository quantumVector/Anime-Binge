import { Control } from '@/features/control';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Notes } from '@/widgets/notes';
import { MainNotesTypes } from '@/shared/lib/types';
import { formModel } from '@/features/form/model';
import { useUnit } from 'effector-react';

interface MainProps extends MainNotesTypes.MainNotes { }

export const Main = ({ data }: MainProps) => {
  return (
    <div className={styles.main}>
      <Control />
      <Notes data={data} />
    </div>
  )
}