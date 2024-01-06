import React, { FC, PropsWithChildren } from 'react';

export const SvgSprite: FC<PropsWithChildren> = ({ children }) => (
  <svg
    style={{
      position: 'absolute',
      width: 1,
      height: 1,
      margin: -1,
      padding: 0,
      overflow: 'hidden',
      border: 0,
      clip: 'rect(0 0 0 0)',
      appearance: 'none',
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);
