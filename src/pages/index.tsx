import React from 'react';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@/components/Profile/Profile'));

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] w-full container">
            <Profile />
        </div>
    );
}
