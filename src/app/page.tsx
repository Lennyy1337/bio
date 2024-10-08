"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { AnimatePresence } from "framer-motion";
import Background from "@/components/background";

interface Timestamps {
  start: number;
  end: number;
}

interface Emoji {
  name: string;
}

interface Asset {
  large_image: string;
  large_text: string;
}

interface Party {
  id: string;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  global_name: string;
  avatar_decoration_data: {
    asset: string;
    sku_id: number;
  };
  display_name: string;
  public_flags: number;
}

interface Activity {
  id: string;
  name: string;
  type: number;
  state: string;
  emoji?: Emoji;
  created_at: number;
  flags?: number;
  session_id?: string;
  details?: string;
  timestamps?: Timestamps;
  assets?: Asset;
  sync_id?: string;
  party?: Party;
}

type status = "online" | "dnd" | "idle";
interface Data {
  kv: Record<string, any>;
  spotify: {
    track_id: string;
    timestamps: Timestamps;
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
  };
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: status;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}

interface ApiResponse {
  data: Data;
  success: boolean;
}
export default function Home() {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState("border-0");
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);

  const getData = async (cancelToken: CancelTokenSource) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await axios.get(
        "https://api.lanyard.rest/v1/users/1272195936231362653",
        { cancelToken: cancelToken.token }
      );
      const resJson = res.data.data;

      if (!resJson.discord_status) {
        return;
      }

      if (resJson.discord_status !== status) {
        switch (resJson.discord_status) {
          case "online":
            setStatus("border-4 border-green-500");
            break;
          case "dnd":
            setStatus("border-4 border-red-500");
            break;
          case "idle":
            setStatus("border-4 border-yellow-300");
            break;
          case "offline":
            setStatus("border-4 border-slate-600");
            break;
          default:
            setStatus("border-4 border-yellow-300");
            break;
        }
      }
      setData(resJson);
    } catch (e) {
      if (!axios.isCancel(e)) {
        setIsError(true);
        if (typeof e === "string") setError(e);
        else if (e instanceof Error) setError(e.message);
        else setError("Error");
      }
    } finally {
      setIsLoading(false);
      setInitialLoadCompleted(true);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getData(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cancelTokenSource = axios.CancelToken.source();
      getData(cancelTokenSource);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <div>
          <Background></Background>
          {/* User */}
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-30 overflow-auto transition-all ease-in-out duration-300">
            <div className="transition-all ease-in-out delay-150 w-11/12 md:w-[500px]  bg-slate-400 overflow-auto shadow-xl shadow-slate-900/100 bg-opacity-30 backdrop-blur-sm rounded-2xl border-solid border-0 border-sky-500 md:hover:-translate-y-5 md:h-auto sm:h-5/6 md:mt-0 sm:mt-10">
              <div className="place-items-center grid">
                <Image
                  src={"/pfp.png"}
                  alt="PFP - Made by u/ItsJust_EmmaBro"
                  width={100}
                  height={100}
                  className={
                    "transition-all ease-in-out delay-50 object-center rounded-full md:mt-10 mt-5 hover:border-0 relative w-36 " +
                    status
                  }
                />
              </div>
              <div className="justify-center items-center flex flex-col py-3 space-y-2">
                <h1 className="md:text-5xl text-3xl font-bold text-white">
                  Lenny
                </h1>
                <h1 className="md:text-3xl text-xl text-white">
                  Full stack developer
                </h1>
              </div>
              <div className="justify-center items-center flex flex-col py-5 space-y-5">
                <a
                  href="/projects"
                  className="text-white transition ease-in-out  border-opacity-50 delay-20 rounded-lg border-solid border-2 border-sky-500 py-2 px-2 size-2/12 w-3/5 hover:-translate-y-1 hover:bg-indigo-500 text-center"
                >
                  Projects
                </a>
                <a
                  href="/socials"
                  className="text-white transition ease-in-out  border-opacity-50 delay-20 rounded-lg border-solid border-2 border-sky-500 py-2 px-2 size-2/12 w-3/5 hover:-translate-y-1 hover:bg-indigo-500 text-center"
                >
                  Socials
                </a>
              </div>
              <div className="justify-between flex mx-8 md:my-3 my-1">
                <div className="flex flex-col md:py-3 justify-center items-center rounded-xl shadow-2xl bg-slate-800 bg-opacity-30 backdrop-blur-md w-full mb-5 ">
                  {/* Picture */}
                  {isLoading && !initialLoadCompleted ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    error
                  ) : data && data.spotify ? (
                    <>
                      <h1 className="text-center md:text-2xl sm:text-lg text-white">
                        Currently listening to:
                      </h1>
                      <Image
                        src={data.spotify.album_art_url}
                        width={130}
                        height={130}
                        alt=""
                        className="md:mx-8 md:my-8 rounded-md sm:w-28 md:w-32"
                      />

                      {/* Title */}
                      <h1 className="md:text-3xl text-center text-2xl text-ellipsis overflow-hidden text-white">
                        {data.spotify.song}
                      </h1>
                      {/* Artist */}
                      <h1 className="text-center text-sm text-ellipsis text-white">
                        {data.spotify.artist}
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl text-center text-white">
                        No song is playing
                      </h1>
                      <h1 className="text-center text-sm text-white">
                        Check back later!
                      </h1>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
