import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Chat from "../../components/play/Chat";

export default function PlayRoom() {
    const router = useRouter();
    const { roomName } = router.query
    const [user, setUser] = useState({name: "", point: 0, icon: ""})

    useEffect(() => {
        const getUserData = async () => {
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
                setUser({name: res.user_name, point: res.own_point, icon: res.user_icon})
            })
        }
        getUserData();
    }, [])

    return (
        <div>
            <Chat roomName={roomName} user={user}/>
        </div>
    )
}