import { updateFirebaseNotes } from "@/shared/api/firebase";
import { MainNotesTypes } from "@/shared/lib/types";
import { notesModel } from "@/widgets/notes/model";
import { createEffect, createEvent, createStore, sample } from "effector";

const updateFormData = createEvent<MainNotesTypes.Note>();
const submitForm = createEvent<boolean>();
const displayForm = createEvent<boolean>();

const submitFormFx = createEffect<any, any>((data) => updateFirebaseNotes(data));

const $formVisibility = createStore<boolean>(false);
const $formDataStore = createStore<MainNotesTypes.Note | null>(null);

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
    fn: () => {
        const formData = $formDataStore.getState();

        if (formData) {
            return formData;
        }

        return null;
    },
    target: submitFormFx,
});

submitFormFx.done.watch((data) => {
    console.log('Document successfully updated!');

    notesModel.addNote(data.params);
    notesModel.selectNote(data.params);
    displayForm(false);
});

submitFormFx.fail.watch((error) => {
    console.error("Form submission failed:", error);
});

export const model = {
    updateFormData,
    submitForm,
    displayForm,
    $formVisibility,
    $formDataStore,
};