import { useState, useEffect } from "react";

export default function Chat ({ roomName, user }) {
    let chatArea = document.getElementById('chatArea');
    const [chatSocket, setChatSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState("")

    const connectChatSocket = () => {
        setChatSocket(new WebSocket(
            'ws://'
            + 'localhost:8080'
            + '/ws/chat/'
            + roomName.replace(/-/g, "")
            + '/')
        )
    }

    useEffect(() => {
        connectChatSocket();
    }, [])

    if (chatSocket) {
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            setMessages([...messages, {userName: data.user_name, message: data.message}])
            chatArea.scrollTop = chatArea.scrollHeight;
        }
        chatSocket.onclose = function(e) {
            connectChatSocket();
        }
    }

    const buttonHandler = (e) => {
        e.preventDefault();
        chatSocket.send(JSON.stringify({user_name: user.name, message: chat}))
        setChat("")
    }

    const chatClassHandler = (index) => {
        if ((index+1)%2===0) {
            return "bg-white-pink p-1 text-sm sm:text-base text-gray-700"
        } else {
            return "bg-white p-1 text-sm sm:text-base text-gray-700"
        }
    }

    return(
        <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono">
            <main className="flex flex-1 float-right justify-center items-center flex-col w-full mb-16 lg:mb-3">
                <article className="overflow-scroll border border-pink-200 w-11/12 mx-auto h-36 sm:h-56" id="chatArea">
                {messages.map((message, index) => <div key={index} className={chatClassHandler(index)}><span className="font-bold mr-2 text-pink-300">{message.userName}:</span>{message.message}</div>)}
                </article>
                <form onSubmit={buttonHandler} className="w-11/12 mt-3 flex">
                <input 
                    name="chat"
                    type="text" 
                    autoComplete="chat" 
                    required className="m-auto appearance-none outline-none rounded-none block w-9/12 md:w-10/12 px-3 py-2 border-b-2 border-pink-100 text-gray-900 focus:z-10 sm:text-sm" 
                    placeholder="メッセージを入力してください" 
                    value={chat}
                    onChange={(e) => {
                        setChat(e.target.value)
                    }} 
                    />
                <button
                    type="submit"
                    className="mr-3 ml-5 mt-3 p-1 bg-transparent h-1/2 bg-pink-200 hover:bg-white text-white hover:text-pink-300 rounded">
                        送信
                </button> 
                </form>
            </main>
        </div>
    )
}