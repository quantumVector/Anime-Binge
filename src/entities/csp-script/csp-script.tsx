'use client';

import Script from 'next/script';
import React from 'react';

export const CspScript = ({ nonce }) => {
    console.log('nonce', nonce)
    return (
        <div>
            test
            {/* <Script
                nonce='NWVhZTA0YTktMjI2Ni00OGJiLThkNjktNjY3NGEyZWZmNGJl'
                id='test-script'
                dangerouslySetInnerHTML={{
                    __html: `
                        console.log('hello world');
                    `
                }}
            /> */}
            <script nonce='NWVhZTA0YTktMjI2Ni00OGJiLThkNjktNjY3NGEyZWZmNGJl' id='test-script'
                dangerouslySetInnerHTML={{
                    __html: `
                        console.log('hello world');
                    `
                }}></script>
        </div>
    )
}