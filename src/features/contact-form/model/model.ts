import { createEffect, createStore, sample } from "effector";
import { Form, createForm } from "effector-forms";
import { rules } from "./rules";

export interface Phone {
    number: string;
    numberType: string;
}

interface LoginFormFields {
    name: string;
    email: string;
    phones: Phone[];
}

const loginForm: Form<LoginFormFields> = createForm({
    fields: {
        name: {
            init: '',
            rules: [
                rules.required(),
                rules.minLength(2),
                rules.maxLength(50),
            ],
        },
        email: {
            init: '',
            rules: [
                rules.email(),
            ],
        },
        phones: {
            init: [{ number: '', numberType: 'main' }],
            rules: [
                // @ts-ignore
                rules.phoneRequired(),
            ],
        },
    },
    validateOn: ['submit', 'blur'],
})

const loginFx = createEffect(async (data: any) => {
    console.log("data:", data);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: "success" });
        }, 3000);
    });
});

const $responseData = createStore<any>({});

sample({
    clock: loginForm.formValidated,
    target: loginFx,
})

sample({
    clock: loginFx.doneData,
    target: $responseData,
})

$responseData.watch((data) => console.log(data));

export const model = {
    loginForm,
    loginFx,
};