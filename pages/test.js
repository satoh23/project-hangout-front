import React from 'react';
import dynamic from 'next/dynamic';
const MyComponent = dynamic(() => import('../components/play/Canvas'), { ssr: false });


export default function Test() {
    return (
        <div>
            <MyComponent />
        </div>
    )
}