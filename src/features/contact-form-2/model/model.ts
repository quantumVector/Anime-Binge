import { createEvent } from "effector";
import { createFieldArray, createForm } from "effector-react-form";

type Values = {
    name: string;
    email: string;
};

const form = createForm<Partial<Values>>({
    onSubmit: ({ values }) => console.log(JSON.stringify(values, null, '  ')),
    initialValues: {
        name: '',
        email: '',
    },
});

const fieldArray = createFieldArray({
    form,
});

const testEvent = createEvent();

export const model = {
    form,
    fieldArray,
    testEvent,
};