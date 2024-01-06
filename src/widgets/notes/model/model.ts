import { MainNotesTypes } from "@/shared/lib/types";
import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const Gate = createGate<MainNotesTypes.Note[]>();

const selectNote = createEvent<MainNotesTypes.Note | null>();
const addNote = createEvent<MainNotesTypes.Note>();

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
    clock: addNote,
    fn: () => true,
    target: $isClientData,
});

$noteList.watch((state) => console.info("notes store", state));

export const model = {
    Gate,
    selectNote,
    addNote,
    $noteList,
    $activeNote,
    $isClientData,
}