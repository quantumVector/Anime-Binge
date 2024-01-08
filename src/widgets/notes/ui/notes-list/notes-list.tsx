import { Card } from '@/entities/card';
import React from 'react';
import styles from './styles.module.scss';
import { notesModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';
import { formModel } from '@/features/form/model';

interface NotesListProps {
    data: MainNotesTypes.Note[];
    activeNoteId: number | null;
}

export const NotesList = ({ data, activeNoteId }: NotesListProps) => {
    const onSelectNote = (item: MainNotesTypes.Note) => {
        formModel.displayForm(false);
        notesModel.selectNote(activeNoteId === item.id ? null : item);
    }

    return (
        <div className={styles.notes}>
            {data.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    tags={item.tags}
                    onClick={() => onSelectNote(item)}
                    active={activeNoteId === item.id ? true : false} />
            ))}
        </div>
    )
}