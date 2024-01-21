import { useFirebase } from "@/shared/api/firebase";
import { FormData, MainNotesTypes } from "@/shared/lib/types";
import { notesModel } from "@/widgets/notes/model";
import { createEffect, createEvent, createStore, sample } from "effector";

const updateFormData = createEvent<MainNotesTypes.Note>();
const submitForm = createEvent<FormData>();
const displayForm = createEvent<boolean>();

const submitFormFx = createEffect((data: FormData): Promise<MainNotesTypes.Note[]> => useFirebase({
    noteData: data.noteData,
    operation: data.operation,
}));

const $formVisibility = createStore<boolean>(false);
const $formDataStore = createStore<MainNotesTypes.Note>({
    id: 0,
    title: '',
    desc: '',
    tags: [],
    text: '',
});

sample({
    clock: updateFormData,
    target: $formDataStore,
});

sample({
    clock: displayForm,
    target: $formVisibility,
});

sample({
    clock: submitForm,
    target: submitFormFx,
});

sample({
    clock: submitFormFx.doneData,
    target: notesModel.updateNoteList,
});

sample({
    clock: submitFormFx.doneData,
    fn: () => false,
    target: $formVisibility,
});

sample({
    source: submitForm,
    clock: submitFormFx.doneData,
    fn: (source) => source.noteData,
    target: notesModel.selectNote,
});

export const model = {
    updateFormData,
    submitForm,
    displayForm,
    $formVisibility,
    $formDataStore,
};