import { updateFirebaseNotes } from "@/shared/api/firebase";
import { MainNotesTypes } from "@/shared/lib/types";
import { createEffect, createEvent, createStore, merge, sample } from "effector";
import { createGate } from "effector-react";

const Gate = createGate<MainNotesTypes.Note[]>();

const selectNote = createEvent<MainNotesTypes.Note | null>();
const addNote = createEvent<MainNotesTypes.Note>();
const removeNote = createEvent<MainNotesTypes.Note>();
const addOrRemoveNote = merge([addNote, removeNote]);
const updateNoteList = createEvent<MainNotesTypes.Note[]>();

const removeNoteFx = createEffect<any, any>((data) => updateFirebaseNotes(data, 'remove'));

const $noteList = createStore<MainNotesTypes.Note[]>([]);
const $activeNote = createStore<MainNotesTypes.Note | null>(null);
const $isClientData = createStore(false);

sample({
    clock: Gate.open,
    target: $noteList,
});

sample({
    clock: selectNote,
    target: $activeNote,
});

sample({
    source: $noteList,
    clock: addNote,
    fn: (source, clock) => {
        return [clock, ...source];
    },
    target: $noteList,
});

sample({
    clock: addOrRemoveNote,
    fn: () => true,
    target: $isClientData,
});

$noteList.watch((state) => console.info("Notes store updated!", state));

sample({
    source: $activeNote,
    clock: removeNote,
    target: removeNoteFx,
});

removeNoteFx.done.watch((data) => {
    console.log('Document successfully updated!');

    let notesList = $noteList.getState();
    const filteredNotesList = notesList.filter((item) => item.id !== data.params.id);

    updateNoteList(filteredNotesList);
    selectNote(null);
});

removeNoteFx.fail.watch((error) => {
    console.error("Form submission failed:", error);
});

sample({
    clock: updateNoteList,
    target: $noteList,
});

export const model = {
    Gate,
    selectNote,
    addNote,
    removeNote,
    updateNoteList,
    $noteList,
    $activeNote,
    $isClientData,
}