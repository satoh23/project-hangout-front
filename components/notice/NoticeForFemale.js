// import { useRouter } from "next/router";

// export default function NoticeForFemale({ senderName, channelName, isShowNotice, setIsShowNotice, noticeSocket, setIsOnceConnect, maleId, femaleId }) {
//     const router = useRouter();

//     const sendConsent = (e) => {
//         e.preventDefault();
//         noticeSocket.send(JSON.stringify({sender_channel_name: channelName, response: true}))
//         setIsShowNotice(!isShowNotice)
//         setIsOnceConnect(false)
//         if (noticeSocket) {
//             noticeSocket.close();
//         }
//         router.push(`/play/${femaleId}${maleId}`)
//     }

//     const sendRejection = (e) => {
//         e.preventDefault();
//         noticeSocket.send(JSON.stringify({sender_channel_name: channelName, response: false}))
//         setIsShowNotice(!isShowNotice)
//         setIsOnceConnect(true)
//         if (noticeSocket) {
//             noticeSocket.close();
//         }
//     }

//     return (
//         <div>
//             <div 
//               className="bg-black overflow-hidden h-full fixed bg-opacity-40 z-50 justify-center items-center flex"
//               style={{
//               width: `100%`
//               }}>
//             </div>
//             <div className="absolute top-0 left-0 bottom-0 right-0 m-auto w-5/6 md:w-1/2 lg:w-1/5 h-1/2 z-50">
//                 <article className="flex flex-col flex-wrap justify-center items-center text-center overflow-hidden rounded-lg w-5/6 md:w-1/2 lg:w-1/3 h-1/2 lg:h-2/5 bg-white fixed">
//                     <div className="leading-tight w-4/6 m-auto pb-2 border-b border-gray-500 text-gray-800 border-dashed text-sm md:text-lg">
//                         <div className="font-bold mb-1 font-bold text-pink-400">{senderName}</div>
//                         <div className="mb-2">からオセロに招待されました</div>
//                         <div className="mb-2">（承諾した場合、<span className="font-bold text-pink-400">300</span>P取得）</div>
//                     </div>
//                     <div className="absolute bottom-1/4 flex">
//                         <button onClick={sendRejection} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white">拒否</button>
//                         <button onClick={sendConsent} className="bg-pink-200 rounded-md shadow-md px-3 py-1 font-bold hover:text-pink-400 hover:bg-white ml-6">承諾</button>
//                     </div>
//                 </article>
//             </div>
//         </div>
//     )
// }
