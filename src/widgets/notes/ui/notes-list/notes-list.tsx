import { Card } from '@/entities/card';
import React from 'react';
import styles from './styles.module.scss';
import { model } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';

interface NotesListProps {
    data: MainNotesTypes.Note[];
    activeNoteId: number | null;
}

export const NotesList = ({ data, activeNoteId }: NotesListProps) => {
    return (
        <div className={styles.notes}>
            {data.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    tags={item.tags}
                    onClick={() => model.selectNote(item)}
                    active={activeNoteId === item.id ? true : false} />
            ))}
        </div>
    )
}