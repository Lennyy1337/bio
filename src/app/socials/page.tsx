"use client";
import Background from "@/components/background";

import { FaDiscord, FaYoutube, FaGithub, FaGit } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";

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
          <div className="transition delay-20 ease-in-out delay-150 border-opacity-50 w-11/12 md:w-4/12 bg-slate-400 shadow-lg shadow-slate-900/100 bg-opacity-30 backdrop-blur-sm rounded-xl border-solid  border-sky-500 hover:-translate-y-5 h-auto">
            <div className="justify-center items-center flex flex-col space-y-5">
              <h1 className="py-10 text-4xl">Socials</h1>
            </div>
            <div className="justify-center items-center flex flex-col pb-20 pt-10 space-y-5">
              <a
                href="https://discord.com/users/551819471149465631"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-blue-800 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <FaDiscord size={40} className="mx-5"></FaDiscord>
                  <span className="ml-[1.6vh] text-2xl">Discord</span>
                </div>
              </a>

              <a
                href="https://www.youtube.com/channel/UC0b1jDceJzkin2Vr1EGAW0w"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-red-900 text-center w-5/6"
              >
                <FaYoutube size={40} className="mx-5"></FaYoutube>
                <span className="ml-[1.6vh] text-2xl">Youtube</span>
              </a>
              <a
                href="https://github.com/Lennyy1337"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-slate-700 text-center w-5/6"
              >
                <FaGithub size={40} className="mx-5"></FaGithub>
                <span className="ml-[1.6vh] text-2xl">Github</span>
              </a>
            </div>
            <div className="justify-center items-center flex flex-col py-10 space-y-5">
              <a
                href="/"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-green-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-green-700 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <IoArrowBackCircle
                    size={40}
                    className="mx-5"
                  ></IoArrowBackCircle>
                  <span className="ml-[1.6vh] text-2xl">Go Back</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
