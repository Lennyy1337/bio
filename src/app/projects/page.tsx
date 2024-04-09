"use client";
import Background from "@/components/background";

import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

export default function Home() {
  async function customInit(main: any) {
    loadLinksPreset(main);
  }

  const particleOptions = {
    preset: "links",
  };

  return (
    <>
      <div>
        <Particles options={particleOptions} init={customInit} />
        {/* User */}
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-30">
          <div className="transition delay-20 ease-in-out delay-150 border-opacity-50 w-11/12 md:w-4/12 bg-slate-400 shadow-lg shadow-slate-900/100 bg-opacity-30 backdrop-blur-sm rounded-xl border-solid border-2 border-sky-500 hover:-translate-y-5 h-auto">
            <div className="justify-center items-center flex flex-col space-y-5">
              <h1 className="py-10 text-4xl">Projects</h1>
            </div>
            <div className="justify-center items-center flex flex-col pb-20 pt-10 space-y-5">
              <a
                href="https://nexusadmin.co"
                className="transition flex ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6 justify-center items-center"
              >
                <span className="text-center justify-center items-center flex text-2xl">
                  Nexus Admin
                </span>
              </a>
              <a
                href="https://discord.gg/hosts"
                className="transition flex ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6 justify-center items-center"
              >
                <span className="text-center justify-center items-center flex text-2xl">
                  Lenny.host
                </span>
              </a>
              <a
                href="https://discord.gg/aurevo-970496322262167612"
                className="transition flex ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6 justify-center items-center"
              >
                <span className="text-center justify-center items-center flex text-2xl">
                  Aurevo
                </span>
              </a>
              <a
                href="https://discord.gg/gQvY5gUKwb"
                className="transition flex ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6 justify-center items-center"
              >
                <span className="text-center justify-center items-center flex text-2xl">
                  Xonia
                </span>
              </a>
            </div>
            <div className="justify-center items-center flex flex-col py-10 space-y-5">
              <a
                href="/"
                className="transition ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-green-500 py-2 px-2 size-2/12 w-5/12 hover:-translate-y-1 hover:bg-green-700 text-center"
              >
                Go back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
