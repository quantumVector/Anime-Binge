import React, { Dispatch, ReactEventHandler, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { NotesActive } from '../notes-active';
import { NotesList } from '../notes-list';
import { useGate, useUnit } from 'effector-react';
import { notesModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';
import { NotesEmpty } from '../notes-empty';
import { NotesMaker } from '../notes-maker';

interface NotesProps {
    data: MainNotesTypes.Note[];
    form: boolean;
    setForm: Dispatch<SetStateAction<boolean>>;
}

export const Notes = ({ data, form, setForm }: NotesProps) => {
    useGate(notesModel.Gate, data);

    const [activeNote, noteList, isClientData] = useUnit([
        notesModel.$activeNote,
        notesModel.$noteList,
        notesModel.$isClientData,
    ])

    const notesData = isClientData ? noteList : data;

    return (
        <section className={styles.notes}>
            {form && <NotesMaker />}
            {!form && (
                <>
                    {activeNote ? <NotesActive {...activeNote} /> : <NotesEmpty />}
                </>
            )}
            <NotesList data={notesData} activeNoteId={activeNote && activeNote.id} setForm={setForm} />
        </section>
    )
};