import { Card } from '@/entities/card';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { notesModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';

interface NotesListProps {
    data: MainNotesTypes.Note[];
    activeNoteId: number | null;
    setForm: Dispatch<SetStateAction<boolean>>;
}

export const NotesList = ({ data, activeNoteId, setForm }: NotesListProps) => {
    return (
        <div className={styles.notes}>
            {data.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    tags={item.tags}
                    onClick={() => {
                        setForm(false);
                        notesModel.selectNote(activeNoteId === item.id ? null : item);
                    }}
                    active={activeNoteId === item.id ? true : false} />
            ))}
        </div>
    )
}