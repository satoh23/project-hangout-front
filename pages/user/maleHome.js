import Layout from "../../components/Layout";
import User from "../../components/user/User";
import useSWR from "swr";
import { useEffect } from "react";
import { getAllUserData } from "../../lib/maleUsers";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";

const cookie = new Cookie();

const fetcher = (url) => fetch(url, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/female-user-list/`;


export default function Home({ staticUsers }) {
    const router = useRouter();
    const {data, mutate} = useSWR(apiUrl, fetcher, {
        initialData: staticUsers,
    }); 

    const sortedUser= data?.sort(
        (a,b) => (a.state_id) - (b.state_id)
    );

    useEffect(() => {
        const gender = cookie.get("GID")
        if (gender === `${process.env.NEXT_PUBLIC_FEMALE_ID}`) {
            router.push("/user/femaleHome", "/")
        } else if (gender === undefined) {
            alert("先にログインしてください")
            router.push("/")
        }
        mutate();
    }, []);

    if (!data) return <div>loading...</div>
    return (
        <Layout>
            <div className="mx-auto flex-wrap flex justify-center items-center">
                {sortedUser &&
                  sortedUser.map((user, index) => <User key={index} user={user} />)}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const staticUsers = await getAllUserData();
    return {
        props: { staticUsers },
        revalidate: 10,
    };
}