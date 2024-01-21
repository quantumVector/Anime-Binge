import { createEvent, createStore, sample } from "effector";

const updateSubmitButtonStatus = createEvent<boolean>();

const $submitButtonStatus = createStore<boolean>(false);

sample({
    clock: updateSubmitButtonStatus,
    target: $submitButtonStatus,
});

export const model = {
    updateSubmitButtonStatus,
    $submitButtonStatus,
};