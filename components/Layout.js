import { useState, useEffect } from "react";
import Cookie from "universal-cookie";

import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footerbar from "./Footerbar";
import NoticeForFemale from "./notice/NoticeForFemale";

const cookie = new Cookie();


export default function Layout({ children, title="Hang Out", changeBlog=false }) {
    const gender = cookie.get("GID")
    const myId = cookie.get("UID")
    const [noticeSocket, setNoticeSocket] = useState(null)
    const [sender, setSender] = useState({name: "", channelName: "", id: ""})
    const [isShowNotice, setIsShowNotice] = useState(false)
    const [isOnceConnect, setIsOnceConnect] = useState(true)

    // const connectSocket = () => {
    //     setNoticeSocket(new WebSocket(
    //         'ws://'
    //         + 'localhost:8080'
    //         + '/ws/notice/'
    //         + myId.replace(/-/g, "")
    //         + '/')
    //     )
    // }

    // useEffect(() => {
    //     const main = async() => {
    //         connectSocket();
    //     }

    //     if (!changeBlog && gender===process.env.NEXT_PUBLIC_FEMALE_ID){
    //         main();
    //     }
    // }, [])

    // if (noticeSocket) {
    //     noticeSocket.onmessage = function(e) {
    //         const data = JSON.parse(e.data);
    //         setSender({name: data.name, channelName: data.sender_channel_name, id: data.male_id})
    //         setIsShowNotice(!isShowNotice)
    //     }
    //     if (isOnceConnect) {
    //         noticeSocket.onclose = function(e) {
    //             connectSocket();
    //         }
    //     } else {
    //         noticeSocket.onclose = function(e) {;}
    //     }
    // }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <Navbar changeBlog={changeBlog} noticeSocket={noticeSocket}/>
                {changeBlog ? "" : <Sidebar noticeSocket={noticeSocket}/>}
                {changeBlog ? "" : <Footerbar />}
                {/* {isShowNotice ? <NoticeForFemale senderName={sender.name} channelName={sender.channelName} isShowNotice={isShowNotice} setIsShowNotice={setIsShowNotice} noticeSocket={noticeSocket} setIsOnceConnect={setIsOnceConnect} maleId={sender.id} femaleId={myId}/> : ""} */}
            </header>

            <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono">
                <main className="flex flex-1 float-right justify-center items-center flex-col w-full mt-20 lg:mt-24 mb-16 lg:mb-3">
                    {children}
                </main>
                <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
                </footer>
            </div>
        </div>
    );
}
