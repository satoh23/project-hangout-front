import { getAllAuthorIds, getAllBlogList } from "../../../lib/blog/getList";
import Blog from "../../../components/blog/Blog";
import useSWR from "swr";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorBlogList ({ staticBlogList, id }) {
    const [user, setUser] = useState({name: "", profile: "", icon: "", state: ""})

    const {data, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-blog-author/${id}/`,
        fetcher, 
        {
          initialData: staticBlogList,
        }
    );

     const fillterdBlogs = data?.sort(
         (a,b) => new Date(b.created_date) - new Date(a.created_date)
     );

     useEffect(() => {
         const getUserProfile = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-user/${id}/`, {
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
                setUser({name: res.user_name, profile: res.user_profile, icon: res.user_icon, state: res.state_id})
            })
         };
         getUserProfile();
         mutate();
     }, [])

    if (!data) return <div>loading...</div>
    return (
        <Layout>
            <div className="mx-auto justify-center items-center w-full">
                <article className="flex overflow-hidden border border-pink-100 rounded-lg bg-white-pink w-3/4 m-auto mb-5 p-3">
                    <Image
                        src={user.icon ? user.icon : "/anonymous.jpg"} 
                        alt="icon" 
                        className="w-28 sm:w-32 h-28 sm:h-32 border border-pink-300 rounded-full"
                        width={160}
                        height={160}/>
                    <div className="items-center justify-between leading-tight w-full relative">
                        <div className="pl-3 pr-3 pt-3 pb-1 border-b border-pink-200 font-semibold border-dashed">
                            <Link href={`/user/detail/${id}`}>
                            <span className="hover:text-red-400 cursor-pointer">
                            {user.name}
                            </span>
                            </Link>
                        </div>
                        <div className="pl-3 pr-3 pt-4 text-xs sm:text-sm line-clamp-3 text-gray-800">
                            {user.profile}
                        </div>
                    </div>
                </article>
                {fillterdBlogs.length===0 ? <div className="w-3/4 m-auto text-center mt-32">このユーザーはまだブログを作っていないようです</div> : 
                 fillterdBlogs && fillterdBlogs.map((blog, index) => <Blog key={index} blog={blog}/>)}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllAuthorIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const staticBlogList = await getAllBlogList(params.id);
    return {
        props: {
            id: params.id,
            staticBlogList,
        },
        revalidate: 10,
    };
}
