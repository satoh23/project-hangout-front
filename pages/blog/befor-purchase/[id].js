import Layout from "../../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getAllBlogIds, getBlogData } from "../../../lib/blog/getList";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Cookie from "universal-cookie";
import Image from 'next/image'

const cookie = new Cookie();
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Blog({ staticBlog, id }) {
    const gender = cookie.get('GID')
    const router = useRouter();
    const [isShowConfirm, setIsShowConfirm] = useState(false)
    const [user, setUser] = useState({id: "", point: 0,})
    const [wasBuy, setWasBuy] = useState(false)
    const [body, setBody] = useState("")

    const {data: blog, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-blog-befor-purchase/${id}/`,
        fetcher, 
        {
          initialData: staticBlog,
        }
    );

    const blogBodyFetch = async() => {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/blog-body/${id}/`, {
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
            setBody(res.body)
        })
    }

    useEffect(() => {
        const getAnyData = async() => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }).then((res)=>{
              if (res.ok){
                ;
              } else{
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
                setUser({id: res.id, point: res.own_point,})
                fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/is-bought/`,{
                    method: "POST",
                    body: JSON.stringify({ purchase: res.id, blog: id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }) 
                .then((res) => {
                    if (res.ok) {
                        setWasBuy(true)
                        blogBodyFetch()
                    } else if (res.status===400) {
                        setWasBuy(false)
                    }
                })
            })
        } catch(err) {
            console.log(err)
        }}
        getAnyData();
        mutate();
    }, []);

    const BuyConfHandler = (e) => {
        e.preventDefault();
        setIsShowConfirm(!isShowConfirm);
    }

    const BuyBlog = async (e) => {
        e.preventDefault();
        try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then((res)=>{
          if (res.ok){
            ;
          } else{
            alert("先にログインしてください")
            router.push("/")
          }
        })
        if (user.point >= blog.price) {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/blog-buy/`, {
                method: "POST",
                body: JSON.stringify({ purchase: user.id, blog: blog.id }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then((res) => {
                if (res.status===201) {
                    alert("購入が完了しました")
                    setWasBuy(true)
                    setIsShowConfirm(!isShowConfirm)
                    blogBodyFetch()
                } else {
                    alert("購入に失敗しました。不具合報告をしていただけると嬉しいです。")
                }
            });
        } else {
            alert("ポイントが足りないため購入ができませんでした。チャージしてからもう一度購入してください。")
            router.push("/point/charge")
        }
    } catch(err){
        console.log(err)
    }
    }

    const BuyConfirm = () => {
        return (
            <div className="absolute top-0 left-0 bottom-0 right-0 m-auto w-5/6 md:w-1/2 lg:w-1/5 h-1/2 z-30">
                <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
                    <div className="leading-tight w-4/6 m-auto text-lg pb-2 border-b border-gray-500 border-dashed text-gray-800">
                        <div className="font-bold text-pink-400 mb-1"> {blog.title} </div>
                        <div className="mb-2">を購入してよろしいですか？</div>
                        <div className="mt-1 mb-2">（<span className="font-bold text-pink-400">{blog.price}</span> P消費）</div>
                    </div>
                    <div className="absolute bottom-1/4 flex">
                        <button onClick={BuyConfHandler} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white">キャンセル</button>
                        <button onClick={BuyBlog} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white ml-6">購入する</button>
                    </div>
                </article>
            </div>
        )
    }

    const BlogBody = () => {
        return (
            <div className="w-full m-auto px-2 py-10 whitespace-pre-wrap">
                {body}
            </div>
        )
    }

    if (router.isFallback  ||  !blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div 
              className="bg-black overflow-hidden h-full fixed bg-opacity-40 z-20 justify-center items-center flex"
              onClick={BuyConfHandler}
              style={{
              width: isShowConfirm ? `100%` : '0' 
            }}>
            </div>
            {isShowConfirm ? BuyConfirm() : ""}
        <Layout>
            <div className="w-full sm:w-5/6 lg:w-2/4 mb-10 md:mb-0 text-center">
                <div>
                    <img
                        src={blog.thumbnail ? blog.thumbnail : "/NoImage.jpg"} 
                        alt="icon" 
                        className="w-auto h-64 md:h-96 container mx-auto border-pink-300 border shadow-md"/>
                </div>
                <h2 className="w-full m-auto pb-4 text-xl md:text-2xl font-semibold mt-6 border-pink-200 border-b border-dashed">
                    {blog.title}
                </h2>
                <h4 className="w-full m-auto pb-4 text-base font-semibold mt-4 pr-3 text-right">
                    ジャンル / {blog.genre ? blog.genre : "無し"}<span className="ml-6">作者 / {blog.author}</span>
                </h4>
                <p className="w-full m-auto px-2 py-10 whitespace-pre-wrap border-pink-200 border-b border-dashed">
                    {blog.summary}
                </p>
                {wasBuy ? BlogBody() :
                <article
                 className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-1/2 lg:w-1/3 h-14 m-auto mt-5 bg-pink-300 hover:bg-white hover:border hover:border-pink-300 text-white hover:text-pink-300"
                 onClick={BuyConfHandler}>
                    <div className="items-center text-center justify-between leading-tight w-full m-auto font-bold text-xl">
                        続きを読む: {blog.price}P消費
                    </div>
                </article>
                }
            </div>
            <article className="flex overflow-hidden border border-pink-100 rounded-lg bg-white-pink w-full sm:w-4/6 lg:w-2/4 m-auto mt-6 p-3">
                <Image
                    src={blog.author_icon ? `${process.env.NEXT_PUBLIC_ANONYMOUS_ICON_URL}${blog.author_icon}` : "/anonymous.jpg"} 
                    alt="icon" 
                    className="w-28 sm:w-32 h-28 sm:h-32 border border-pink-300 rounded-full"
                    width={160}
                    height={160}
                    />
                <div className="items-center justify-between leading-tight w-full relative">
                    <div className="pl-3 pr-3 pt-3 pb-1 border-b border-pink-200 font-semibold border-dashed">
                        {gender===`${process.env.NEXT_PUBLIC_MALE_ID}` ? 
                        <Link href={`/user/detail/${blog.author_id}`}>
                        <span className="hover:text-red-400 cursor-pointer">
                        {blog.author}
                        </span>
                        </Link>
                        :
                        <span>
                        {blog.author}
                        </span>
                        }
                    </div>
                    <div className="pl-3 pr-3 pt-4 text-xs sm:text-sm line-clamp-3 text-gray-800">
                        {blog.author_profile}
                    </div>
                </div>
            </article>
        </Layout>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = await getAllBlogIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const staticBlog = await getBlogData(params.id);
    return {
        props: {
            id: params.id,
            staticBlog,
        },
        revalidate: 3,
    };
}
