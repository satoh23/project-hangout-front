import Layout from "../../components/Layout";
import { getAllBlogData } from "../../lib/blog/getList";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import Blog from "../../components/blog/Blog";
import EditBlog from "../../components/blog/EditBlog";

const cookie = new Cookie();

const fetcher = (url) => fetch(url, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/list-blog/`;

export default function BlogList({ staticBlogs }) {
    const router = useRouter();
    const gender = cookie.get('GID')
    const {data, mutate} = useSWR(apiUrl, fetcher, {
        initialData: staticBlogs,
    }); 

    const fillterdBlogs = data?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    );

    useEffect(() => {
        mutate();
    }, []);

    if (!data) return <div>loading...</div>
    return (
        <Layout>
            {gender===`${process.env.NEXT_PUBLIC_FEMALE_ID}` ? <EditBlog /> : ""}
            <div className="mx-auto justify-center items-center">
                {fillterdBlogs &&
                  fillterdBlogs.map((blog, index) => <Blog key={index} blog={blog}/>)}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const staticBlogs = await getAllBlogData();
    return {
        props: { staticBlogs },
        revalidate: 10,
    };
}