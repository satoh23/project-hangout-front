import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { getAllUserIds, getUserData } from "../../../lib/maleUsers";
import useSWR from "swr";
import { useEffect, useState } from "react";
import UserDetailMenu from "../../../components/user/UserDetailMenu";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function User({ staticUser, id }) {
    const router = useRouter();
    const [isShowInvite, setIsShowInvite] = useState(false)

    const {data: user, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-user/${id}/`,
        fetcher, 
        {
          initialData: staticUser,
        }
    );

    useEffect(() => {
        mutate();
    }, []);

    if (router.isFallback  ||  !user) {
        return <div>Loading...</div>;
    }

    const stateHandler = (id) => {
        const stateColor = (stateId) => {
            if (stateId === 1) {
                return "text-green-400"
            } else if (stateId === 2) {
                return "text-yellow-400"
            } else {
                return "text-gray-400"
            }
        }
        return (
            <span>
                <span className={stateColor(id)}>● </span>
                <span className="inline">
                {1===id ? "ログイン中" : ""}
                {2===id ? "遊び中" : ""}
                {3===id ? "ログアウト中" : ""}
                </span>
            </span>
        )
    }

    const raceHandler = (id) => {
        return (
            <span className="text-sm">
                {1===id ? "S女" : ""}
                {2===id ? "年上" : ""}
                {3===id ? "年下" : ""}
                {4===id ? "メスガキ" : ""}
                {5===id ? "韓女" : ""}
                {6===id ? "ネカマ" : ""}
            </span>
        )
    }

    const activityTimeHandler = (id) => {
        return (
            <span className="text-sm">
                {1===id ? "早朝 (03:00~07:59)" : ""}
                {2===id ? "午前中 (08:00~11:59)" : ""}
                {3===id ? "午後 (12:00~16:59)" : ""}
                {4===id ? "夜 (17:00~22:59)" : ""}
                {5===id ? "深夜 (23:00~02:59)" : ""}
            </span>
        )
    }

    return (
        <div>
            <div 
              className="bg-black overflow-hidden h-full fixed bg-opacity-40 z-50 justify-center items-center flex"
              style={{
              width: isShowInvite ? `100%` : '0' 
              }}>
            </div>
            <Layout>
                <div className="w-full sm:w-2/3 rounded-md">
                    <div className="relative">
                    <img
                        src={user.user_icon ? user.user_icon : "/anonymous.jpg"} 
                        alt="icon" 
                        className="w-auto m-auto p-6"/>
                    <p className="m-4 float absolute bg-white rounded-full lg:left-32 bottom-0 p-3 text-sm sm:text-base bg-opacity-70 border-2 border-pink-300 font-bold">
                        {user.user_name} : {user.state_id ? stateHandler(user.state_id) : ""}
                    </p>
                    </div>
                    <UserDetailMenu genderId={user.gender_id} id={id} userName={user.user_name} isShowInvite={isShowInvite} setIsShowInvite={setIsShowInvite} />
                    <div className="w-auto m-auto border-t-2 border-pink-200 border-dashed p-6 text-sm whitespace-pre-wrap">
                        {user.user_profile}
                    </div>
                    <div className="w-auto m-auto border-t border-pink-200 pr-6 pl-9 pt-3 pb-3 text-sm">
                        タイプ{" ： "}{user.race_id ? raceHandler(user.race_id) : ""}
                    </div>
                    <div className="w-auto m-auto bg-pink-50 pr-6 pl-9 pt-3 pb-3 text-sm">
                        <a href={user.user_twitter_url} target="blank">twitter{" ： "}<span className="hover:text-pink-500">{user.user_twitter_url ? user.user_twitter_url : ""}</span></a>
                    </div>
                    <div className="w-auto m-auto pr-6 pl-6 pt-3 pb-3 text-sm">
                        活動時間{" ： "}{user.activity_time_frame_id ? activityTimeHandler(user.activity_time_frame_id) : ""}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = await getAllUserIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const staticUser = await getUserData(params.id);
    return {
        props: {
            id: params.id,
            staticUser,
        },
        revalidate: 3,
    };
}