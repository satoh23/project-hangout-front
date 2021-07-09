import Link from 'next/link';
import { useRouter } from "next/router";
import getNewToken from "./GetNewToken";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Sidebar({ noticeSocket=null }) {
    var isSuccess = null
    const router = useRouter();
    const gender = cookie.get("GID")

    const logout = async () => {
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
                    const newToken = getNewToken();
                    if (newToken) {
                        logout();
                    } else {
                        isSuccess = false
                        alert("このユーザーは既にログアウト済みです。")
                        router.push("/")
                    };
                } else if (res.ok) {
                    isSuccess = true
                    return res.json();
                }
            })
        } catch (err) {
            alert(err);
        };
        if (isSuccess) {
            try{
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
                .then((res) => {
                    return res.json();
                })
            } catch (err) {
                alert(err);
            }
        }
        isSuccess = null;
        if (noticeSocket) {
            noticeSocket.onclose = function(e) {;}
            noticeSocket.close();
        }
        router.push("/")
    };
    return (
        <div>
            <div className="h-screen w-1/6 float-left hidden lg:block">
            </div>
            <div className="fixed h-full bg-white-pink w-1/6 hidden lg:block border-r border-powder-pink">
                <aside className="">
                    <div className='lg:ml-auto min-w-full w-max flex flex-col lg:h-auto mt-16'>
                        <Link href={gender===`${process.env.NEXT_PUBLIC_MALE_ID}` ? "/user/maleHome" : "/user/femaleHome"} as="/">
                            <a className='border-b border-pink-200 w-full px-5 py-2 mb-4 mt-4 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
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
                            <a className='border-b border-pink-200 w-full px-5 py-2 mb-4 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
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
                            <a className='border-b border-pink-200 w-full px-5 py-2 mb-4 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
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
                            <a className='border-b border-pink-200 w-full px-5 py-2 mb-4 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
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
                            <a className='border-b border-pink-200 w-full px-5 py-2 mb-4 rounded text-red-800 hover:bg-pink-200 hover:text-white'>
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
        </div>
    )
}