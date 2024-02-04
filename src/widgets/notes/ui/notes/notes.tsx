import React from 'react';
import styles from './styles.module.scss';
import { NotesActive } from '../notes-active';
import { NotesList } from '../notes-list';
import { useGate, useUnit } from 'effector-react';
import { notesModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';
import { NotesEmpty } from '../notes-empty';
import { NotesMaker } from '../notes-maker';
import { formModel } from '@/features/form/model';

interface NotesProps {
    data: MainNotesTypes.Note[];
}

export const Notes = ({ data }: NotesProps) => {
    useGate(notesModel.Gate, data);

    const [
        activeNote,
        noteList,
        formVisibility,
        multipleSelectMod,
        selectedNotes,
    ] = useUnit([
        notesModel.$activeNote,
        notesModel.$noteList,
        formModel.$formVisibility,
        notesModel.$multipleSelectMod,
        notesModel.$selectedNotes,
    ]);

    return (
        <section className={styles.notes}>
            {formVisibility && <NotesMaker />}
            {!formVisibility && (
                <>
                    {activeNote ? <NotesActive {...activeNote} /> : <NotesEmpty />}
                </>
            )}
            <NotesList
                data={noteList}
                activeNoteId={activeNote && activeNote.id}
                multipleSelectMod={multipleSelectMod}
                selectedNotes={selectedNotes}
            />
        </section>
    )
};