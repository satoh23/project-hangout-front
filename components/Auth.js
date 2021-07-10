import { useState } from "react";
import { useRouter } from "next/router";


export default function Auth() {
    const router = useRouter();
    const [username, serUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState(0);
    const [isLogin, setIsLogin] = useState(true);


    const login = async () => {
        try{
        await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/login/`,
            {
                method: "POST",
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }
        )
        .then((res) => {
            if (res.status === 400) {
                throw "ログインに失敗しました";
            } else if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            if (data.user.gender_id === `${process.env.NEXT_PUBLIC_MALE_ID}`) {
                router.push("/user/maleHome", "/");
            } else if (data.user.gender_id === `${process.env.NEXT_PUBLIC_FEMALE_ID}`) {
                router.push("/user/femaleHome", "/");
            }
        })
    }   catch (err) {
        alert(err);
    }
    };

    const authUser = async (e) => {
        e.preventDefault();
        if (isLogin) {
            login();
        } else {
            try{
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-user/`, {
                method: "POST",
                body: JSON.stringify({ user_name: username, email: email, password: password, gender_id: gender }),
                headers: {
                    "Content-Type": "application/json",
                }, 
            })
            .then((res) => {
                if (res.status === 400) {
                    throw "ユーザー作成に失敗しました";
                } else if (res.ok) {
                    return res.json();
                }
            });
        } catch (err) {
            alert(err);
        }
        router.push("/user/sent-varifi-email");
        }
    };

    return (
        <div className="max-w-md w-full space-y-8">
            <div>
            <img className="mx-auto h-28 w-auto" src="/男女.png" alt="HangOut" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                {isLogin ? "ログイン" : "ユーザー登録"}
            </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={authUser} method="post">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                {isLogin ? 
                <>
                <div>
                <input 
                name="email"
                type="email" 
                autoComplete="email" 
                required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="メールアドレス" 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }} 
                />
                </div>
                <div>
                <input 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="パスワード" 
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }} 
                />
                </div>
                </>:

                <>
                <div>
                <input 
                name="username"
                type="text" 
                autoComplete="username" 
                required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="ユーザー名" 
                value={username}
                onChange={(e) => {
                    serUsername(e.target.value)
                }} 
                />
                </div>
                <div>
                <input 
                name="email"
                type="email" 
                autoComplete="email" 
                required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md" 
                placeholder="メールアドレス" 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }} 
                />
                </div>
                <div>
                <input 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="パスワード" 
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }} 
                />
                </div>
                <div className="text-center">
                <label>
                <input
                name="gender"
                type="radio"
                value="男性"
                required className="mr-1"
                onClick={(e) => {
                    setGender(`${process.env.NEXT_PUBLIC_MALE_ID}`)
                }}
                /><span className="mr-8">男性</span>
                </label>
                </div>
                </>}
            </div>

            <div className="flex items-center justify-center">

                <div className="text-sm">
                <span onClick={() => setIsLogin(!isLogin)} className=" cursor-pointer font-medium text-pink-300 hover:text-pink-500">
                {isLogin ? "アカウントの新規作成はこちら" : "ログインはこちら"}
                </span>
                </div>
            </div>

            <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </span>
                {isLogin ? "ログイン" : "登録"}
                </button>
            </div>
            </form>
        </div>
    );
}
