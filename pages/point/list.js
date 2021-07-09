import Link from "next/link";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function List () {
    const [point, setPoint] = useState(0)
    const router = useRouter();

    useEffect(() => {
        const getPoint = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            .then((res) => {
                if (res.ok) {
                    ;
                } else {
                    alert("先にログインしてください")
                    router.push("/")
                }
            })
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/point-get/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setPoint(res.own_point)
            })
        }
        getPoint();
    }, []);

    return (
        <Layout>
            <div className="text-lg md:text-2xl font-medium pb-4 border-b border-pink-200 border-dashed w-2/4 text-center">
                所持ポイント：<span className="ml-1">{String(Math.floor(point)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')} P</span>
            </div>
            <Link href="/point/charge">
            <article className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-1/2 lg:w-1/3 h-14 ml-3 mt-4 bg-red-400 hover:bg-white hover:border hover:border-red-400 text-white hover:text-red-400">
                <div className="items-center text-center justify-between leading-tight w-full m-auto font-bold text-xl">
                    チャージする
                </div>
            </article>
            </Link>
            <article className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-1/2 lg:w-1/3 h-14 ml-3 mt-4 bg-pink-300 hover:bg-white hover:border hover:border-pink-300 text-white hover:text-pink-300">
                <div className="items-center text-center justify-between leading-tight w-full m-auto font-bold text-xl">
                    出金申請
                </div>
            </article>
        </Layout>
    )
}