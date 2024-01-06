
import { Typo } from '@/shared/ui/typo';
import React from 'react';
import styles from './styles.module.scss';
import { MainNotesTypes } from '@/shared/lib/types';

interface NotesActiveProps extends MainNotesTypes.Note {};

export const NotesActive = ({ title, desc, text }: NotesActiveProps) => {
    return (
        <div className={styles.note}>
            <Typo as='h1' design='header-m' raw={title} className={styles.note__title} />
            <Typo as='p' design='header-s' raw={desc} className={styles.note__desc} />
            <Typo as='p' design='text-m-medium' raw={text} />
        </div>
    )
}
