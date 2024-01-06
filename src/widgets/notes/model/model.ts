import { MainNotesTypes } from "@/shared/lib/types";
import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const Gate = createGate<MainNotesTypes.Note[]>();

const selectNote = createEvent<MainNotesTypes.Note>();

const $noteList = createStore<MainNotesTypes.Note[]>([]);
const $activeNote = createStore<MainNotesTypes.Note | null>(null);

sample({
    clock: Gate.open,
    target: $noteList,
});

sample({
    clock: selectNote,
    target: $activeNote,
})

//Gate.state.watch((state) => console.info("gate state updated", state));
//$data.watch((state) => console.info("store", state));
//$activeNote.watch((state) => console.info("store", state));

export const model = {
    Gate,
    selectNote,
    $activeNote,
}