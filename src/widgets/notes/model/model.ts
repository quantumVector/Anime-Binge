import { useFirebase } from "@/shared/api/firebase";
import { MainNotesTypes } from "@/shared/lib/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { debug, once } from "patronum";

const selectNote = createEvent<MainNotesTypes.Note | null>();
const removeNote = createEvent<MainNotesTypes.Note>();
const updateNoteList = createEvent<MainNotesTypes.Note[]>();

const removeNoteFx = createEffect((data: MainNotesTypes.Note) => useFirebase({
    noteData: data,
    operation: 'remove',
}));

const $noteList = createStore<MainNotesTypes.Note[]>([]);
const $activeNote = createStore<MainNotesTypes.Note | null>(null);

sample({
    clock: selectNote,
    target: $activeNote,
});

sample({
    clock: removeNote,
    target: removeNoteFx,
});

sample({
    clock: removeNoteFx.doneData,
    target: $noteList,
});

sample({
    clock: removeNoteFx.doneData,
    fn: () => null,
    target: $activeNote,
});

sample({
    clock: updateNoteList,
    target: $noteList,
});

const Gate = createGate<MainNotesTypes.Note[]>();

sample({
    clock: once(Gate.open),
    target: $noteList,
});

debug({ noteList: $noteList });

export const model = {
    Gate,
    selectNote,
    removeNote,
    updateNoteList,
    $noteList,
    $activeNote,
}