"use client";
import Background from "@/components/background";
import { TiMessages } from "react-icons/ti";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaServer } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { SiRoblox } from "react-icons/si";

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
              <h1 className="py-10 text-4xl text-white">Projects</h1>
            </div>
            <div className="justify-center items-center flex flex-col pb-20 pt-10 space-y-5">
              <a
                href="https://nexusadmin.co"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <SiRoblox size={40} className="mx-3"></SiRoblox>
                  <span className="ml-[1.6vh] text-2xl text-white">Nexus Admin</span>
                </div>
              </a>
              <a
                href="https://discord.gg/hosts"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <FaRegImage size={40} className="mx-3"></FaRegImage>
                  <span className="ml-[1.6vh] text-2xl text-white ">Lenny.host</span>
                </div>
              </a>
              <a
                href="https://discord.gg/aurevo-970496322262167612"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <FaServer size={40} className="mx-3"></FaServer>
                  <span className="ml-[1.6vh] text-2xl text-white">Aurevo</span>
                </div>
              </a>
              <a
                href="https://discord.gg/gQvY5gUKwb"
                className="transition flex items-center ease-in-out delay-20 rounded-lg border-opacity-50 border-solid border-2 border-sky-500 py-2 px-2 size-2/12 md:w-5/12 hover:-translate-y-1 hover:bg-indigo-500 text-center w-5/6"
              >
                <div className="flex items-center w-full">
                  <TiMessages size={40} className="mx-3"></TiMessages>
                  <span className="ml-[1.6vh] text-2xl text-white">Xonia</span>
                </div>
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
                  <span className="ml-[1.6vh] text-2xl text-white">Go Back</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
