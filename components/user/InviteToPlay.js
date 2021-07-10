// import Cookie from "universal-cookie";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import ReactLoading from 'react-loading';

// const cookie = new Cookie();

// export default function InviteToPlay({ isShowInvite, setIsShowInvite, handleInvite, userName, id }) {
//     const router = useRouter();
//     const myId = cookie.get("UID")
//     const [user, setUser] = useState({name: "", point: 0})
//     const [inviteSocket, setInviteSocket] = useState(null)
//     const [nowInviting, setNowInviting] = useState(false)
//     const [responseInvite, setResponseInvite] = useState(null)

//     useEffect(() => {
//         setInviteSocket(
//             new WebSocket(
//                 'ws://'
//                 + 'localhost:8080'
//                 + '/ws/invite/'
//                 + myId.replace(/-/g, "")
//                 + '/'
//             )
//         )
//         const getUserData = async() => {
//             await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include"
//             })
//             .then((res) => {
//                 if (res.ok) {
//                     fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/point-get/`,{
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         credentials: "include"
//                     })
//                     .then((res) => {
//                         return res.json()
//                     })
//                     .then((res) => {
//                         setUser({name: res.user_name, point: res.own_point})
//                     })
//                 } else {
//                     alert("先にログインしてください")
//                     router.push("/")
//                 }
//             })
//         }
//         getUserData();
//     }, [handleInvite])

//     const returnArticle = (nowInviting) => {
//         if (nowInviting) {
//             return (
//                 <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
//                     <div className="leading-tight m-auto pb-2 text-gray-800 text-sm md:text-lg">
//                         <div>
//                             <div className="font-bold mb-1 font-bold text-pink-400">{userName}</div>
//                             <div className="mb-5">からの返答を待っています...</div>
//                         </div>
//                             <div className="flex justify-center">
//                             <ReactLoading type={"spinningBubbles"} color={"#dcdcdc"} height={150} width={150}/>
//                         </div>
//                     </div>
//                 </article>
//             )
//         } else {
//             return (
//                 <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
//                     <div className="leading-tight w-4/6 m-auto pb-2 border-b border-gray-500 text-gray-800 border-dashed text-sm md:text-lg">
//                         <div className="font-bold mb-1 font-bold text-pink-400">{userName}</div>
//                         <div className="mb-2">をオセロに誘いますか？</div>
//                         <div className="mb-2">（承諾された場合、<span className="font-bold text-pink-400">0</span>P消費）</div>
//                     </div>
//                     <div className="absolute bottom-1/4 flex">
//                         <button onClick={cancelInvite} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white">キャンセル</button>
//                         <button onClick={sendInvite} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white ml-6">誘う</button>
//                     </div>
//                 </article>
//             )
//         }
//     }

//     const returnResponseInvite = (responseInvite) => {
//         if (responseInvite===true) {
//             fetch(
//                 `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/point-edit/`,
//                 {
//                     method: "PATCH",
//                     body: JSON.stringify({ female_id: id }),
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include"
//                 }
//             )
//             .then((res) => {
//                 if (res.ok) {
//                     window.setTimeout(() => router.push(`/play/${id}${myId}`), 1000)
//                 }
//             })
//             return (
//                 <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
//                     <div className="leading-tight w-4/6 m-auto pb-2 text-gray-800 text-lg font-bold border-b border-gray-500 border-dashed">
//                         <div className="mb-2">招待が承諾されました</div>
//                         <div className="mb-2">専用ページに移動します</div>
//                     </div>
//                 </article>
//             )
//         } else if (responseInvite===false) {
//             window.setTimeout(() => setIsShowInvite(!isShowInvite), 1000)
//             return (
//                 <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
//                     <div className="leading-tight w-4/6 m-auto pb-2 text-gray-800 text-lg font-bold border-b border-gray-500 border-dashed">
//                         <div className="font-bold mb-1 font-bold text-pink-400">{userName}</div>
//                         <div className="mb-2">さんは今忙しいようです</div>
//                     </div>
//                 </article>
//             )
//         }
//     }

//     if (inviteSocket) {
//         inviteSocket.onmessage = function(e) {
//             const data = JSON.parse(e.data);
//             inviteSocket.close();
//             setNowInviting(!nowInviting)
//             setResponseInvite(data.response)
//         }
//     }

//     const sendInvite = (e) => {
//         e.preventDefault();
//         if (user.point >= 500) {
//             inviteSocket.send(JSON.stringify({name: user.name, female_id: id.replace(/-/g, ""), male_id: myId}))
//             setNowInviting(!nowInviting)
//         } else {
//             alert("ポイントが足りないため招待できません")
//             setIsShowInvite(!isShowInvite)
//         }
//     }

//     const cancelInvite = (e) => {
//         e.preventDefault();
//         setIsShowInvite(!isShowInvite)
//         inviteSocket.close();
//     }

//     return (
//         <div>
//             <div className="absolute top-0 left-0 bottom-0 right-0 m-auto w-5/6 md:w-1/2 lg:w-1/5 h-1/2 z-50">
//                 {responseInvite===true || responseInvite===false ? returnResponseInvite(responseInvite) : returnArticle(nowInviting)}
//             </div>
//         </div>
//     )
// }
