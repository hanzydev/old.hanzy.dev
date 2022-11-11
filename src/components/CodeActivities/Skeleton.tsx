import { Spacer } from '@nextui-org/react';

export default function Skeleton() {
    return (
        <div className="shadow rounded-md p-4 m-0 backdrop-blur-lg">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4 animate-pulse">
                <div className="rounded-lg bg-[#2b2f31] h-[21vh] w-[21vh] sm:h-[17vh] sm:w-[17vh]"></div>
                <div className="mt-6 sm:mt-0 space-y-2 sm:space-y-0 flex flex-col items-center sm:items-baseline">
                    <div className="bg-[#2b2f31] rounded w-72 h-8 sm:w-64"></div>
                    <Spacer y={1} />
                    <div className="bg-[#2b2f31] rounded w-[25rem] h-4 sm:w-[100vh]"></div>
                    <div className="bg-[#2b2f31] rounded w-[25rem] h-4 sm:hidden"></div>
                    <div className="bg-[#2b2f31] rounded w-[10rem] h-4 sm:hidden"></div>
                </div>
            </div>
        </div>
    );
}
