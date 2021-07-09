import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Blog from "../../components/blog/Blog";

export default function BlogEditList() {
    const router = useRouter();
    const [blogs, setBlogs] = useState(null)
    const fillterdBlogs = blogs?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    );
    useEffect(() => {
        const getEditList = async() => {
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
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/list-mine-blog/`, {
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
                setBlogs(res)
            })
        };
        getEditList();
    }, [])

    if (blogs===null) {
        return <duv>loading.....</duv>
    }
    return (
        <Layout>
            <div className="mx-auto justify-center items-center">
                <div className="text-xl text-red-600 font-bold m-auto pb-4 mb-6 text-center border-b border-pink-200">○編集したいブログを選択してください○</div>
                {fillterdBlogs &&
                  fillterdBlogs.map((blog) => <Blog key={blog.id} blog={blog} isEdit={true}/>)}
            </div>
        </Layout>
    )
}