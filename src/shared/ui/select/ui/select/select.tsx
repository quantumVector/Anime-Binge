'use client'

import { FieldsForm, SelectOption } from '@/shared/lib/types';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import ReactSelect, { SingleValue } from 'react-select';

type SelectProps = {
    options: SelectOption[];
    field?: ControllerRenderProps<FieldsForm, 'select'>,
    handleChange: (option: SingleValue<SelectOption>) => void;
}

export const Select = ({ options, field, handleChange }: SelectProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return (
        <div>
            {isMounted && (
                <ReactSelect
                    options={options}
                    isSearchable={false}
                    defaultValue={options[0]}
                    classNamePrefix='custom-select'
                    onChange={(selectedOption) => {
                        field ? field.onChange(selectedOption) : null;
                        handleChange(selectedOption);
                    }}
                />
            )}
        </div>
    )
};