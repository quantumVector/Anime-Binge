import { Rule } from 'effector-forms'
import { Phone } from './model';

export const rules = {
    required: (): Rule<string> => ({
        name: "required",
        validator: (value: string) => Boolean(value),
    }),
    email: (): Rule<string> => ({
        name: "email",
        validator: (value: string) => /\S+@\S+\.\S+/.test(value)
    }),
    minLength: (min: number): Rule<string> => ({
        name: "minLength",
        validator: (value) => value.length >= min,
    }),
    maxLength: (max: number): Rule<string> => ({
        name: "maxLength",
        validator: (value) => value.length <= max
    }),
    phoneNumberFormat: (): Rule<string> => ({
        name: "phoneNumberFormat",
        validator: (value: string) => /\d{10}/.test(value),
    }),
    phoneRequired: (): Rule<string> => ({
        name: "phoneRequired",
        validator: (value: any): boolean => {
            let result = true;
            
            value.forEach((item: Phone) => {
                if (!item.number) {
                    result = false;
                }
            })

            return result;
        },
    }),
}