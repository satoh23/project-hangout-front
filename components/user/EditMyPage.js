import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'

export default function EditMyPage() {
    const router = useRouter();
    const [user, setUser] = useState(
                        {id: "", name: "", profile: "", icon: "", encodedIcon: "", twitter: "",
                         activityTimeId: 0, raceId: 0, activityTime: "", race: ""})
    const [newUser, setNewUser] = useState(
                            {name: "", profile: "", icon: "", encodedIcon: "", twitter: "",
                             activityTimeId: 0, raceId: 0, activityTime: "", race: ""})
    const [raceList, setRaceList] = useState(null)
    const [timeList, setTimeList] = useState(null)
    const [previwIcon, setPreviwIcon] = useState("")
    const [isChangeFile, setIsChangeFile] = useState(false)
    const [nowChanging, setNowChanging] = useState(false)
    const [reFetch, setReFetch] = useState(false)

    useEffect(() => {
        let haveValidToken = false
        const getRaceList = () => {
            fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/race-list/`,
            {
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
                setRaceList(res)
            })
        }

        const getTimeList = () => {
            fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/time-list/`,
            {
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
                setTimeList(res)
            })
        }

        const userDetail = () => {
            fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            .then((res) => {
                if (res.status === 401) {
                    haveValidToken = false
                    return haveValidToken
                } else if (res.ok) {
                    haveValidToken = true
                    return res.json();
                }
            })
            .then((data) => {
                if (data !== false) {
                setUser(
                    {id: data.id, name: data.user_name, profile: data.user_profile, 
                     icon: data.user_icon, encodedIcon: data.encoded_icon,
                     twitter: data.user_twitter_url, 
                     activityTimeId: data.activity_time_frame_id, raceId: data.race_id,
                     activityTime: data.activity_time_frame, race: data.race})
                setNewUser(
                    {name: data.user_name, profile: data.user_profile, icon: data.user_icon, encodedIcon: data.encoded_icon,
                    twitter: data.user_twitter_url, 
                    activityTimeId: data.activity_time_frame_id, raceId: data.race_id,
                    activityTime: data.activity_time_frame, race: data.race})
                }
            })
            if (!haveValidToken) {
                fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })
                .then((res) => {
                    if (res.ok) {
                        userDetail();
                    } else {
                        alert("先にログインしてください")
                        router.push("/")
                    }
                })
                }
        };

        const main = async () => {
            getRaceList();
            getTimeList();
            userDetail();
        }
        main();
    }, [reFetch]);

    const update = async (e) => {
        e.preventDefault();
        let haveValidToken = false
        let wasGetNewToken = false
        if (newUser.twitter) {
            if (/^https:\/\/twitter.com\/$/.test(newUser.twitter)) {
                pass;
            } else {
                alert("TwitterのURLが正しくありません")
                return 
            }
        } 
        if (isChangeFile) {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
                {
                  method: "PATCH",
                  body: JSON.stringify({ user_id: user.id, user_name: newUser.name, user_profile: newUser.profile, user_icon: newUser.icon, encoded_icon: newUser.encodedIcon,
                                         user_twitter_url: newUser.twitter, activity_time_frame_id: newUser.activityTimeId, race_id: newUser.raceId }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include"
                }
              ).then((res) => {
                if (res.status === 401) {
                  haveValidToken = false
              } else {
                  haveValidToken = true
              }
              });
              if (!haveValidToken) {
                  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      credentials: "include"
                  })
                  .then((res) => {
                      if (res.ok) {
                          wasGetNewToken = true
                      } else {
                          alert("先にログインしてください")
                          router.push("/")
                      }
                  })
              }
              if (wasGetNewToken) {
                  await fetch(
                      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
                      {
                        method: "PATCH",
                        body: JSON.stringify({ user_id: user.id, user_name: newUser.name, user_icon: newUser.icon, user_profile: newUser.profile, encoded_icon: newUser.encodedIcon,
                                               user_twitter_url: newUser.twitter, activity_time_frame_id: newUser.activityTimeId, race_id: newUser.raceId }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include"
                      }
                    )
              }
        } else {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
                {
                  method: "PATCH",
                  body: JSON.stringify({ user_id: user.id, user_name: newUser.name, user_profile: newUser.profile, user_icon: newUser.encodedIcon, encoded_icon: newUser.encodedIcon,
                                         user_twitter_url: newUser.twitter, activity_time_frame_id: newUser.activityTimeId, race_id: newUser.raceId }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include"
                }
              ).then((res) => {
                if (res.status === 401) {
                  haveValidToken = false
              } else {
                  haveValidToken = true
              }
              });
              if (!haveValidToken) {
                  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      credentials: "include"
                  })
                  .then((res) => {
                      if (res.ok) {
                          wasGetNewToken = true
                      } else {
                          alert("先にログインしてください")
                          router.push("/")
                      }
                  })
              }
              if (wasGetNewToken) {
                  await fetch(
                      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`,
                      {
                        method: "PATCH",
                        body: JSON.stringify({ user_id: user.id, user_name: newUser.name, user_profile: newUser.profile, user_icon: newUser.encodedIcon, encoded_icon: newUser.encodedIcon,
                                               user_twitter_url: newUser.twitter, activity_time_frame_id: newUser.activityTimeId, race_id: newUser.raceId }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include"
                      }
                    )
              }
        }
        setReFetch(!reFetch)
        setNowChanging(!nowChanging)
      };

    const encodeFile = (e) => {
        if (e.target.files[0]) {
            setPreviwIcon(window.URL.createObjectURL(e.target.files[0]));
            let file_reader = new FileReader();
            file_reader.readAsDataURL(e.target.files[0]);
            file_reader.addEventListener('load', function(e) {
            let encodedFile = e.target.result
            encodedFile = encodedFile.replace(/^data:\w+\/\w+;base64,/, "")
            setNewUser({...newUser, icon: encodedFile, encodedIcon: encodedFile})
            setIsChangeFile(true)
            })
        }
    };

    const canselChangeUser = (e) => {
        e.preventDefault();
        setNewUser(
            {name: user.name, profile: user.profile, icon: user.icon, encodedIcon: user.encodedIcon,
             twitter: user.twitter, activityTimeId: user.activityTimeId, raceId: user.raceId})
        setNowChanging(!nowChanging)
        setIsChangeFile(false)
    }
    if (raceList===null || timeList===null) {
        return <div>now roading....</div>
    }
    return (
        <div className="w-full sm:w-3/4 lg:w-2/4 mb-10 md:mb-0">
            {nowChanging ? 
                <form onSubmit={update} method="post">
                    <div className="text-center">
                        <div>
                            <img
                            src={isChangeFile ? previwIcon : user.icon} 
                            alt="icon" 
                            className="rounded-full sm:w-40 sm:h-40 w-32 h-32 container mx-auto border-pink-300 border shadow-md"/>
                        </div>
                        <div className="mt-6">
                        <input
                        type="file"
                        onChange={encodeFile}
                        />
                        </div>
                        <br />

                        <div className="flex w-full mt-12">
                        <span className="w-3/12 mt-2 ml-2 text-sm">{"　　"}名前：</span>
                        <input
                        required className="mb-5 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                        type="text"
                        value={newUser.name}
                        onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                        }/>
                        </div>

                        <div className="flex w-full">
                        <span className="w-3/12 mt-4 ml-2 text-sm">自己紹介：</span>
                        <textarea
                        required className="resize-none mb-5 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                        type="text"
                        placeholder="500文字以内" 
                        value={newUser.profile}
                        onChange={(e) =>
                            setNewUser({ ...newUser, profile: e.target.value })
                        }/>
                        </div>

                        <div className="flex w-full">
                        <span className="w-3/12 mt-2 ml-2 relative bottom-3 sm:bottom-0 text-sm">{"　"}Twitter：</span>
                        <input
                        className="resize-none mb-5 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm" 
                        type="url"
                        placeholder="URL" 
                        value={newUser.twitter}
                        onChange={(e) =>
                            setNewUser({ ...newUser, twitter: e.target.value })
                        }/>
                        </div>

                        <div className="w-full flex">
                        <span className="w-3/12 mt-1 ml-2 text-sm">活動時間：</span>
                        <select
                        className="w-full p-1 mb-5 rounded border border-gray-300 focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm pr-10"
                        onChange={(e) => setNewUser({...newUser, activityTimeId: e.target.value})}>
                            <option value={null}>----- 選択してください -----</option>
                            {timeList &&
                            timeList.map((time) => time.id===newUser.activityTimeId ? <option key={time.id} value={time.id} selected>{time.activity_time_frame}</option> : <option key={time.id} value={time.id}>{time.activity_time_frame}</option> )}
                        </select>
                        </div>

                        <div className="w-full flex">
                        <span className="w-3/12 mt-1 ml-2 text-sm">{"　"}タイプ：</span>
                        <select
                        className="w-full p-1 rounded border border-gray-300 focus:outline-none focus:ring-pink-400 focus:border-pink-400 text-sm pr-10"
                        onChange={(e) => setNewUser({...newUser, raceId: e.target.value})}>
                            <option value={null}>----- 選択してください -----</option>
                            {raceList &&
                            raceList.map((race) => race.id===newUser.raceId ? <option key={race.id} value={race.id} selected>{race.race}</option> : <option key={race.id} value={race.id}>{race.race}</option> )}
                        </select>
                        </div>
                    </div>
                    <button
                    onClick={canselChangeUser}
                    className="absolute right-1/4 mt-6 bg-transparent hover:bg-indigo-200 text-indigo-300 hover:text-white py-1 px-3 border border-indigo-300 hover:border-transparent rounded">
                        キャンセル
                    </button>
                    <button
                    type="submit"
                    className="absolute left-3/4 mt-6 ml-4 bg-transparent hover:bg-pink-200 text-pink-300 hover:text-white py-1 px-3 border border-pink-300 hover:border-transparent rounded">
                        変更
                    </button>
                </form>:
                <div className="text-center">
                    <div>
                        <img
                         src={user.icon ? user.icon : "/anonymous.jpg"} 
                         alt="icon" 
                         className="rounded-full md:w-40 md:h-40 w-32 h-32 container mx-auto border-pink-300 border shadow-md"/>
                        <h2 className="w-3/4 m-auto pb-4 text-xl md:text-2xl font-semibold mt-6 border-pink-200 border-b border-dashed">
                             {user.name}
                        </h2>
                        <p className="w-3/4 m-auto px-2 py-10 border-pink-200 border-b border-dashed whitespace-pre-wrap">
                            {user.profile}
                        </p>
                        <div className="flex w-3/4 m-auto h-28 mt-4 py-1">
                            <div className="h-full flex w-1/3">
                                <div className="m-auto h-10 w-10"> 
                                <Image
                                 src="/twitter.ico"
                                 alt="Twitter" 
                                 width={100}
                                 height={100}/>
                                </div>
                            </div>
                            <div className="h-full flex w-1/3 border-pink-200 border-l border-r border-dashed">
                                <div className="m-auto"><span className="font-semibold block mb-2 text-pink-300">活動時間</span>{user.activityTime}</div>
                            </div>
                            <div className="h-full flex w-1/3">
                                <div className="m-auto"><span className="font-semibold block mb-2 text-pink-300">タイプ</span>{user.race}</div>
                            </div>
                        </div>
                    </div>
                    <button
                    onClick={(e) => setNowChanging(!nowChanging)}
                    className="mt-6 bg-transparent hover:bg-pink-200 text-pink-300 font-semibold hover:text-white py-2 px-4 border border-pink-300 hover:border-transparent rounded-full">
                        変更する
                    </button>
                </div>
            }
        </div>
    )
}
