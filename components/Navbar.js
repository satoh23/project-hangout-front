import Link from 'next/link';
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Navbar({ changeBlog, noticeSocket=null }) {
    const router = useRouter();
    const menuContentEl = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const gender = cookie.get("GID")
    const handleClick = () => {setIsActive(!isActive)};


    const logout = async () => {
        let haveValidToken = false
        let wasGetNewToken = false
        try{
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ state_id: 3}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }
            )
            .then((res) => {
                if (res.status === 401) {
                    haveValidToken = false
                } else if (res.ok) {
                    haveValidToken = true
                }
            })
        } catch (err) {
            alert(err);
        };
        try{
            if (!haveValidToken) {
                await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })
                .then((res) => {
                    if (res.ok) {
                        logout();
                        wasGetNewToken = true
                    } else {
                        alert("既にログアウト済みです")
                        router.push("/")
                    }
                })
            }
        } catch (err) {
            alert(err);
        };
        try{
            if (!wasGetNewToken) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/logout/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include"
                    }
                )
            }
        } catch (err) {
            alert(err);
        }
        if (noticeSocket) {
            noticeSocket.onclose = function(e) {;}
            noticeSocket.close();
        }
        router.push("/")
    };
    return (
        <div>
            <nav className={`w-full flex items-center flex-wrap bg-pink-200 font-nav lg:p-2 z-40 fixed pb-1 lg:border-b lg:border-powder-pink ${isActive ? "" : "border-b border-powder-pink"}`}>
                <Link href={gender===`${process.env.NEXT_PUBLIC_MALE_ID}` ? "/user/maleHome" : "/user/femaleHome"} as="/">
                    <a className='inline-flex items-center p-1 mr-4 ml-2'>
                    <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                    <span className='text-xl text-white tracking-wide'>
                    HangOut
                    </span>
                    </a>
                </Link>
                {changeBlog ? "" :
                <button
                 className='inline-flex p-2 rounded lg:hidden text-white ml-auto mr-2 outline-none focus:outline-none'
                 onClick={handleClick}>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                    </svg>
                </button>}
            </nav>
            <div
                 className={`bg-white-pink transition-all duration-500 lg:flex-grow overflow-hidden h-full fixed lg:mt-12 z-30 border-r border-powder-pink rounded-r ${isActive ? 'lg:hidden' : ''}`}
                 ref={menuContentEl}
                 style={{
                     width: isActive ? `60%` : '0' 
                 }}>
                <button
                  className={`${isActive ? "block" : "hidden"} float-right mt-11`}
                  onClick={handleClick}>
                    <div className="rounded text-white bg-opacity-0 fixed">
                    <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                    </div>
                </button>
                <aside className="">
                    <div className='lg:ml-auto min-w-full w-max flex flex-col lg:h-auto mt-12 lg:mt-14'>
                        <Link href={gender===`${process.env.NEXT_PUBLIC_MALE_ID}` ? "/user/maleHome" : "/user/femaleHome"} as="/">
                            <a className='border-b border-pink-200 w-full px-3 py-2 mb-4 mt-4 ml-2 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
                                <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-6 w-6 inline-block pb-1 mr-1" 
                                 viewBox="0 0 20 20" 
                                 fill="currentColor"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                ホーム
                            </a>
                        </Link>
                        <Link href='/blog/list'>
                            <a className='border-b border-pink-200 w-full px-3 py-2 mb-4 ml-2 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
                                <svg
                                 xmlns="http://www.w3.org/2000/svg" 
                                 className="h-6 w-6 inline-block pb-1 mr-1" 
                                 viewBox="0 0 20 20" 
                                 fill="currentColor"
                                 >
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                ブログ
                            </a>
                        </Link>
                        <Link href='/message/list'>
                            <a className='border-b border-pink-200 w-full px-3 py-2 mb-4 ml-2 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
                                <svg
                                 xmlns="http://www.w3.org/2000/svg" 
                                 className="h-6 w-6 inline-block pb-1 mr-1" 
                                 viewBox="0 0 20 20" 
                                 fill="currentColor"
                                 >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                メッセージ
                            </a>
                        </Link>
                        <Link href='/point/list'>
                            <a className='border-b border-pink-200 w-full px-3 py-2 mb-4 ml-2 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
                                <svg
                                 xmlns="http://www.w3.org/2000/svg" 
                                 className="h-6 w-6 inline-block pb-1 mr-1" 
                                 viewBox="0 0 20 20" 
                                 fill="currentColor"
                                 >
                                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                                </svg>
                                ポイント
                            </a>
                        </Link>
                        <Link href='/user/mypage'>
                            <a className='border-b border-pink-200 w-full px-3 py-2 mb-4 ml-2 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
                            <svg
                             xmlns="http://www.w3.org/2000/svg" 
                             className="h-6 w-6 inline-block pb-1 mr-1" 
                             viewBox="0 0 20 20" 
                             fill="currentColor"
                             >
                                <path
                                 fillRule="evenodd" 
                                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" 
                                />
                            </svg>
                                マイページ
                            </a>
                        </Link>
                        <button
                        className="min-w-max hover:bg-pink-200 mb-6"
                        onClick={logout}>
                            <div className='border-b border-pink-200 ml-2 px-3 py-2 rounded text-red-800 hover:text-white text-left'>
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 inline-block pb-1 ml-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            >
                            <path
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                            </svg>
                            ログアウト
                            </div>
                        </button>
                    </div>
                </aside>
            </div>
            <div 
              className="bg-black lg:hidden overflow-hidden h-full fixed lg:mt-12 fixed right-0 bg-opacity-40 z-20"
              onClick={handleClick}
              style={{
              width: isActive ? `100%` : '0' 
            }}>
            </div>
        </div>
    );
}
