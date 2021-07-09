import Link from "next/link";

export default function MaleMenu () {
    return (
        <div className='flex w-full overflow-hidden flex-row h-auto content-center'>
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
    )
}