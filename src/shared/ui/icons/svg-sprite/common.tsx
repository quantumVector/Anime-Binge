import { SvgSprite } from './svg-sprite';

export type CommonIconId =
    | 'plus'
    | 'bookmark'
    | 'trash-bin';

export const CommonIcons = () => (
    <SvgSprite>
        <symbol id="plus" viewBox="0 0 18 18" fill='none'>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </symbol>
        <symbol id="bookmark" viewBox="0 0 14 20" fill='none'>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z" />
        </symbol>
        <symbol id="trash-bin" viewBox="0 0 18 20" fill='none'>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
        </symbol>
    </SvgSprite>
);
