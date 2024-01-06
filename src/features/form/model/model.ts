import { MainNotesTypes } from "@/shared/lib/types";
import { notesModel } from "@/widgets/notes/model";
import { createEvent, createStore, sample } from "effector";

const updateFormData = createEvent<MainNotesTypes.Note>();
const submitForm = createEvent<boolean>();
const resetFormSubmitted = createEvent<boolean>();

const $formDataStore = createStore<MainNotesTypes.Note | null>(null);

const $formSubmitted = createStore<boolean>(false);

sample({
    clock: updateFormData,
    target: $formDataStore,
});

sample({
    clock: submitForm,
    fn: () => true,
    target: $formSubmitted,
});

$formSubmitted.watch((state) => {
    if (state) {
        const data = $formDataStore.getState() as MainNotesTypes.Note;

        notesModel.addNote(data);
        notesModel.selectNote(data);
    }
});

sample({
    clock: resetFormSubmitted,
    target: $formSubmitted,
});

export const model = {
    updateFormData,
    submitForm,
    resetFormSubmitted,
    $formDataStore,
    $formSubmitted,
};