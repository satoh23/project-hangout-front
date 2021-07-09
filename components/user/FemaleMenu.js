import Link from "next/link";
import { useState } from "react";

import InviteToPlay from "./InviteToPlay";

export default function FemaleMenu ({ id, userName, isShowInvite, setIsShowInvite }) {
    const [handleInvite, setHandleInvite] = useState(false)

    const inviteHandler = () => {
        setHandleInvite(!handleInvite)
        setIsShowInvite(!isShowInvite)
    }

    return (
        <div>
            {isShowInvite ? <InviteToPlay userName={userName} isShowInvite={isShowInvite} setIsShowInvite={setIsShowInvite} id={id} handleInvite={handleInvite}/> : ""}
            <div className='flex w-full overflow-hidden flex-row h-auto content-center'>
            <span className='text-xs rounded text-white text-center m-auto cursor-pointer'
                onClick={inviteHandler}>
                <svg
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 p-2 m-auto bg-pink-200 rounded-full"
                viewBox="0 0 20 20" 
                fill="currentColor">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                <span className="text-pink-300">遊ぶ</span>
            </span>
            <Link href={`/blog/author/${id}/`}> 
                <a className='text-xs rounded text-white text-center m-auto'>
                    <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 p-2 m-auto bg-pink-200 rounded-full"
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span className="text-pink-300">ブログ</span>
                </a>
            </Link>
            <Link href='/maleHome' as="/"> 
                <a className='text-xs rounded text-white text-center m-auto'>
                    <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 p-2 m-auto bg-pink-200 rounded-full"
                    viewBox="0 0 20 20" 
                    fill="currentColor">
                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                    <span className="text-pink-300">プレゼント</span>
                </a>
            </Link>
            <Link href='/message/list' as="/"> 
                <a className='text-xs rounded text-white text-center m-auto'>
                    <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 p-2 m-auto bg-pink-200 rounded-full" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-pink-300">メッセージ</span>
                </a>
            </Link>
            </div>
        </div>
    )
}