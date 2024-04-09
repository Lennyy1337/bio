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
        "https://api.lanyard.rest/v1/users/551819471149465631",
        { cancelToken: cancelToken.token }
      );
      const resJson = res.data.data;

      if (!resJson.discord_status) {
        return;
      }

      if (resJson.discord_status !== status) {
        switch (resJson.discord_status) {
          case "online":
            setStatus("border-green-500");
            break;
          case "dnd":
            setStatus("border-red-500");
            break;
          case "idle":
            setStatus("border-yellow-300");
            break;
          case "offline":
            setStatus("border-slate-600");
            break;
          default:
            setStatus("border-yellow-300");
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
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-30">
            <div className="transition delay-20 ease-in-out delay-150 w-11/12 md:w-4/12 bg-slate-400 shadow-lg shadow-slate-900/100 bg-opacity-30 backdrop-blur-sm rounded-lg border-solid border-2 border-sky-500 hover:-translate-y-5 md:h-auto sm:h-full">
              <div className="place-items-center grid">
                <Image
                  src={"/pfp.png"}
                  width={200}
                  height={200}
                  alt="pfp"
                  className={
                    "transition-all ease-in-out delay-50 object-center rounded-full mt-10  border-4 hover:border-0 " +
                    status
                  }
                />
              </div>
              <div className="justify-center items-center flex flex-col py-5 space-y-5">
                <h1 className="text-5xl">Lenny</h1>
                <h1 className="text-3xl">Full stack developer</h1>
              </div>
              <div className="justify-center items-center flex flex-col py-5 space-y-5">
                <a
                  href="/projects"
                  className="transition ease-in-out delay-20 rounded-lg border-solid border-2 border-sky-500 py-2 px-2 size-2/12 w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center"
                >
                  Projects
                </a>
                <a
                  href="/socials"
                  className="transition ease-in-out delay-20 rounded-lg border-solid border-2 border-sky-500 py-2 px-2 size-2/12 w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center"
                >
                  Socials
                </a>
              </div>
              <div className="justify-between flex mx-8 my-3">
                <div className="flex flex-col py-3 justify-center items-center rounded-md bg-slate-800 bg-opacity-30 backdrop-blur-md w-full my-5">
                  {/* Picture */}
                  {isLoading && !initialLoadCompleted ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    error
                  ) : data && data.spotify ? (
                    <>
                      <Image
                        src={data.spotify.album_art_url}
                        width={130}
                        height={130}
                        alt=""
                        className="mx-8 my-8 rounded-md"
                      />
                      {/* Title */}
                      <h1 className="text-3xl text-center">
                        {data.spotify.song}
                      </h1>
                      {/* Artist */}
                      <h1 className="text-center text-sm">
                        {data.spotify.artist}
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl text-center">
                        No song is playing
                      </h1>
                      <h1 className="text-center text-sm">
                        No song is playing
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
