import React from 'react';
import { Typo } from '@/shared/ui/typo';

export const NotesEmpty = () => {
    return (
        <div>
            <Typo as='p' design='header-s' raw='Выберите записку' />
        </div>
    )
};