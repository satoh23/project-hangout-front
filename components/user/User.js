import Link from "next/link";
import Image from 'next/image'


export default function User({ user }) {

    const stateHandler = (id) => {
        const stateColor = (stateId) => {
            if (stateId === 1) {
                return "text-green-400"
            } else if (stateId === 2) {
                return "text-yellow-400"
            } else {
                ;
            }
        }
        return (
            <span>
                <span className={stateColor(id)}>● </span>
                <span className="hidden sm:inline">
                {1===id ? "ログイン" : ""}
                {2===id ? "遊び中" : ""}
                {3===id ? "ログアウト" : ""}
                </span>
            </span>
        )
    }

    const raceHandler = (id) => {
        return (
            <span>
                {1===id ? "11" : ""}
                {2===id ? "asdg" : ""}
                {3===id ? "fasdfa" : ""}
                {4===id ? "gfagfdg" : ""}
                {5===id ? "gasfgfdg" : ""}
                {6===id ? "fdsgdfgfdg" : ""}
            </span>
        )
    }

    return (
    <Link href={`/user/detail/${user.id}`}>
        <div className="mb-2 mt-2 mr-1 ml-1">
            <div className="my-1 px-1 w-full lg:my-4 lg:px-4">

                <article className="cursor-pointer overflow-hidden border-pink-100 border rounded-lg shadow-md w-24 h-32 sm:w-44 sm:h-44">
                    <Image
                        src={user.user_icon ? user.user_icon : "/anonymous.jpg"} 
                        alt="icon" 
                        width={190}
                        height={135}/>
                    <div className="items-center justify-between leading-tight p-1">
                        <div className="h-1/4 text-gray-400 text-xs truncate">
                            {user.race_id ? raceHandler(user.race_id) : "未設定"} / {user.state_id ? stateHandler(user.state_id) : ""}
                        </div>
                        <div className="h-3/4 text-xs sm:text-sm truncate">
                            {user.user_name}
                        </div>
                    </div>
                </article>

            </div>
        </div>
    </Link>
    );
}