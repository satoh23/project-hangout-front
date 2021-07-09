import { useState, useEffect } from "react";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useSWR from "swr";

const cookie = new Cookie();

const fetcher = (url) => fetch(url, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/list-genre/`;


export default function BlogCreate() {
    const router = useRouter();
    const [blog, setBlog] = useState({thumbnail: null, title: "", summary: "", body: "", price: 0,
                                      author: "", genre: ""})
    const [previwThumbnail, setPreviwThumbnail] = useState("")
    const [isPriceError, setIsPriceError] = useState(false)
    const [isChangeFile, setIsChangeFile] = useState(false)

    const {data, mutate} = useSWR(apiUrl, fetcher); 

    useEffect(() => {
        const gender = cookie.get("GID")
        if (gender !== `${process.env.NEXT_PUBLIC_FEMALE_ID}`) {
            alert("このユーザーはブログの作成ができません")
            router.push("/blog/list")
        } else {
            ;
        }
    }, []);

    const createBlog = async (e) => {
        e.preventDefault();
        const price = Math.floor(blog.price*1.1)
        const author = cookie.get("UID")
        let haveValidToken = false
        let wasGetNewToken = false
        if (isChangeFile) {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-blog/`,
                {
                method: "POST",
                body: JSON.stringify({thumbnail: blog.thumbnail, encoded_thumbnail: blog.thumbnail, title: blog.title,
                                      summary: blog.summary, body: blog.body, price: price, author_id: author, genre_id: blog.genre}),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
                }
            ).then((res) => {
                if (res.status === 401) {
                haveValidToken = false
            } else {
                haveValidToken = true
                router.push("/blog/list")
            }
            });
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
                        wasGetNewToken = true
                    } else {
                        alert("先にログインしてください")
                        router.push("/")
                    }
                })
            }
            if (wasGetNewToken) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-blog/`,
                    {
                    method: "POST",
                    body: JSON.stringify({thumbnail: blog.thumbnail, encoded_thumbnail: blog.thumbnail, title: blog.title,
                                          summary: blog.summary, body: blog.body, price: price, author_id: author, genre_id: blog.genre}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })
                router.push("/blog/list")
            }
        } else {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-blog-not-thumbnail/`,
                {
                  method: "POST",
                  body: JSON.stringify({title: blog.title, summary: blog.summary, body: blog.body, price: price, author_id: author, genre_id: blog.genre}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include"
                }
              ).then((res) => {
                if (res.status === 401) {
                  haveValidToken = false
              } else {
                  haveValidToken = true
                  router.push("/blog/list")
              }
              });
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
                          wasGetNewToken = true
                      } else {
                          alert("先にログインしてください")
                          router.push("/")
                      }
                  })
              }
              if (wasGetNewToken) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-blog-not-thumbnail/`,
                    {
                      method: "POST",
                      body: JSON.stringify({title: blog.title, summary: blog.summary, body: blog.body, price: price, author_id: author, genre_id: blog.genre}),
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include"
                })
                router.push("/blog/list")
              }
        }
    }

    const encodeFile = (e) => {
        if (e.target.files[0]) {
            setPreviwThumbnail(window.URL.createObjectURL(e.target.files[0]));
            let file_reader = new FileReader();
            file_reader.readAsDataURL(e.target.files[0]);
            file_reader.addEventListener('load', function(e) {
            let encodedFile = e.target.result
            encodedFile = encodedFile.replace(/^data:\w+\/\w+;base64,/, "")
            setBlog({...blog, thumbnail: encodedFile})
            })
            setIsChangeFile(true)
        }
    };

    const setPrice = (e) => {
        const price = Number(e.target.value)
        if (isNaN(price)) {
            setIsPriceError(true);
        } else {
            setBlog({...blog, price: price});
        }
    }

    return (
        <form method="post" onSubmit={createBlog}>
        <Layout changeBlog={true}>
        <div className="w-full sm:w-3/4 lg:w-2/4 mb-10 md:mb-0 text-center">
                <div>
                    <img
                    src={previwThumbnail ? previwThumbnail : "/NoImage.jpg"} 
                    alt="icon" 
                    className="w-auto h-64 md:h-96 container mx-auto border-pink-300 border shadow-md"/>
                </div>
                <div className="mt-6">
                    <input
                    type="file"
                    onChange={encodeFile}
                    />
                </div>

                <div className="flex w-full mt-12">
                    <span className="w-5/12 md:w-3/12 mt-2 text-sm">タイトル：</span>
                    <input
                    required className="mb-5 mr-6 sm:mr-0 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                    type="text"
                    placeholder="タイトル"
                    maxlength="50"
                    value={blog.title}
                    onChange={(e) =>
                        setBlog({ ...blog, title: e.target.value })
                    }/>
                </div>

                <div className="flex w-full">
                        <span className="w-5/12 md:w-3/12 mt-4 text-sm">前書き：</span>
                        <textarea
                        required className="resize-none mr-6 sm:mr-0 mb-5 appearance-none rounded-none relative inline-flex w-full h-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                        type="text"
                        placeholder="前書きはブログを購入していないユーザーにも表示されます" 
                        value={blog.summary}
                        onChange={(e) =>
                            setBlog({ ...blog, summary: e.target.value })
                        }/>
                </div>

                <div className="flex w-full">
                        <span className="w-5/12 md:w-3/12 mt-4 text-sm">本文：</span>
                        <textarea
                        required className="resize-none mr-6 sm:mr-0 mb-5 appearance-none rounded-none relative inline-flex w-full h-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                        type="text"
                        placeholder="本文はブログを購入したユーザーのみが閲覧可能です" 
                        value={blog.body}
                        onChange={(e) =>
                            setBlog({ ...blog, body: e.target.value })
                        }/>
                </div>

                <div className="w-full flex">
                        <span className="w-5/12 md:w-3/12 mt-1 text-sm">ジャンル：</span>
                        <select
                        className="w-full p-1 mb-5 mr-6 sm:mr-0 rounded border border-gray-300 focus:outline-none focus:ring-pink-300 focus:border-pink-300 text-sm pr-10"
                        onChange={(e) => setBlog({...blog, genre: e.target.value})}>
                            <option value={null}>----- 選択してください -----</option>
                            {data &&
                            data.map((genre) => <option key={genre.id} value={genre.id} >{genre.genre}</option> )}
                        </select>
                </div>

                <div className="w-full flex">
                <span className="w-5/12 md:w-3/12 mt-2 text-sm">価格：</span>
                <input
                 required className="mr-6 sm:mr-0 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm"
                 type="tel"
                 maxlength="6"
                 value={blog.price}
                 onChange={setPrice}/>
                </div>
                <div className="w-full flex">
                <span className="w-3/12 md:w-3/12"></span>
                {isPriceError ? <span className="text-sm mr-auto text-red-600">(!)半角数字のみ入力可能です。</span> : ""}
                </div>
                <div className="text-sm text-center text-gray-800 mt-3">※キャンセルする場合は左上のロゴをクリックしてください。</div>

                <div className='flex w-full overflow-hidden flex-row h-auto content-center pb-3 hidden lg:block text-right'>
                    <span className="text-xl font-bold ml-auto truncate mt-6">{String(Math.floor(blog.price*1.1)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}{" "}円(手数料込み)</span>
                    <button
                        type="submit"
                        className="mt-6 ml-4 bg-transparent hover:bg-pink-200 text-pink-300 hover:text-white py-1 px-3 border border-pink-300 hover:border-transparent rounded">
                            公開する
                    </button> 
                </div>
        </div>
        </Layout>
        <nav className='w-full flex bg-opacity-80 items-center flex-wrap bg-pink-200 font-nav z-10 fixed bottom-0 lg:hidden block border-t border-powder-pink'>
            <div className='flex w-full overflow-hidden flex-row h-auto content-center p-2'>
                    <div className="text-xl font-bold ml-auto truncate">{String(Math.floor(blog.price*1.1)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}{" "}円(手数料込み)</div>
                    <button
                        type="submit"
                        className="mr-3 ml-5 bg-transparent font-bold bg-pink-300 hover:bg-white text-white hover:text-pink-300 hover:text-white py-2 px-3 rounded">
                            公開する
                    </button> 
            </div>
        </nav>
        </form>
    )
}