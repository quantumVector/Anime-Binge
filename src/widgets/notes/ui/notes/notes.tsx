import React from 'react';
import styles from './styles.module.scss';
import { NotesActive } from '../notes-active';
import { NotesList } from '../notes-list';
import { useGate, useUnit } from 'effector-react';
import { model } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';
import { NotesEmpty } from '../notes-empty';

interface NotesProps {
    data: MainNotesTypes.Note[];
}

export const Notes = ({ data }: NotesProps) => {
    useGate(model.Gate, data);

    const [activeNote] = useUnit([
        model.$activeNote,
    ])

    return (
        <section className={styles.notes}>
            {activeNote ? <NotesActive {...activeNote} /> : <NotesEmpty />}
            <NotesList data={data} activeNoteId={activeNote && activeNote.id} />
        </section>
    )
};