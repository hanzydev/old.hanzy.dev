import React from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
    const Profile = dynamic(() => import('@/components/Profile/Profile'));

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] w-full container">
            <Profile />
        </div>
    );
}
