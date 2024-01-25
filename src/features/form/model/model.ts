import { useFirebase } from "@/shared/api/firebase";
import { FormData, MainNotesTypes } from "@/shared/lib/types";
import { notesModel } from "@/widgets/notes/model";
import { createEffect, createEvent, createStore, sample } from "effector";
import { debug, reset, status } from "patronum";

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
const $status = status(submitFormFx);
const $loader = createStore<boolean>(false);

sample({
    clock: $status,
    fn: (value) => value === 'pending' ? true : false,
    target: $loader,
});

debug({ loader: $loader });

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

reset({
    clock: submitFormFx.doneData,
    target: $formVisibility,
});

sample({
    source: submitForm,
    clock: submitFormFx.doneData,
    fn: (source) => source.noteData,
    target: notesModel.selectNote,
});

debug(submitForm);

export const model = {
    updateFormData,
    submitForm,
    displayForm,
    $formVisibility,
    $formDataStore,
    $status,
    $loader,
};