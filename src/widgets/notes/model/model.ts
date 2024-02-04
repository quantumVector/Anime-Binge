import { useFirebase } from "@/shared/api/firebase";
import { MainNotesTypes } from "@/shared/lib/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { combineEvents, condition, debug, once, reset, spread } from "patronum";

const selectNote = createEvent<MainNotesTypes.Note | null>();
const removeNote = createEvent<MainNotesTypes.Note>();
const updateNoteList = createEvent<MainNotesTypes.Note[]>();
const activateMultipleSelectMod = createEvent<boolean>();
const saveSelectedNote = createEvent<MainNotesTypes.Note>();
const removeSelectedNote = createEvent<MainNotesTypes.Note>();
const resetSelectedNotes = createEvent();
const resetActiveNote = createEvent();

const removeNoteFx = createEffect((data: MainNotesTypes.Note) => useFirebase({
    noteData: data,
    operation: 'remove',
}));

const $noteList = createStore<MainNotesTypes.Note[]>([]);
const $activeNote = createStore<MainNotesTypes.Note | null>(null);
const $multipleSelectMod = createStore<boolean>(false);
const $selectedNotes = createStore<MainNotesTypes.Note[]>([]);

sample({
    clock: removeNote,
    target: removeNoteFx,
});

// sample({
//     clock: removeNoteFx.doneData,
//     target: $noteList,
// });

// sample({
//     clock: removeNoteFx.doneData,
//     fn: () => null,
//     target: $activeNote,
// });

sample({
    clock: removeNoteFx.doneData,
    fn: (data) => ({
        noteList: data,
        activeNote: null,
    }),
    target: spread({
        targets: {
            noteList: $noteList,
            activeNote: $activeNote,
        }
    })
})

sample({
    clock: updateNoteList,
    target: $noteList,
});

sample({
    clock: activateMultipleSelectMod,
    target: $multipleSelectMod,
});

condition({
    source: selectNote,
    if: $multipleSelectMod,
    then: condition({
        if: (source) => !$selectedNotes.getState().find((item) => item.id === source.id),
        then: saveSelectedNote,
        else: removeSelectedNote,
    }),
    else: $activeNote,
});

condition({
    source: activateMultipleSelectMod,
    if: !$multipleSelectMod,
    then: resetSelectedNotes,
});

sample({
    source: $selectedNotes,
    clock: saveSelectedNote,
    fn: (source, clock) => [...source, clock],
    target: $selectedNotes,
});

sample({
    source: $selectedNotes,
    clock: removeSelectedNote,
    fn: (source, clock) => source.filter((note) => note.id !== clock.id),
    target: $selectedNotes,
});

reset({
    clock: resetSelectedNotes,
    target: $selectedNotes,
});

combineEvents({
    events: [selectNote, activateMultipleSelectMod],
    target: resetActiveNote as any,
});

reset({
    clock: resetActiveNote,
    target: $activeNote,
});

debug({ $activeNote: $activeNote });
debug({ $selectedNotes: $selectedNotes });

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
    activateMultipleSelectMod,
    $noteList,
    $activeNote,
    $multipleSelectMod,
    $selectedNotes,
}