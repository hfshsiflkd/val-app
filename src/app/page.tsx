"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showLoader) {
      timer = setTimeout(() => {
        setShowLoader(false);
        setShowResult(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showLoader]);

  const handleYesClick = () => {
    setShowQuestion(false);
    setShowLoader(true);
  };

 const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>) => {
   const button = e.currentTarget;
   const container = button.parentElement?.parentElement;

   if (container) {
     const containerRect = container.getBoundingClientRect();
     const buttonWidth = button.clientWidth;
     const buttonHeight = button.clientHeight;

     // Дэлгэцийн яг голын координатыг авах
     const centerX = containerRect.width / 2 - buttonWidth / 2;
     const centerY = containerRect.height / 2 - buttonHeight / 2;

     // Хөдөлгөөн 400px-ээс хэтрэхгүй байх
     const maxMove = 200; // Радиус (400px-ийн диаметр)

     // Санамсаргүй байрлалыг голоос хазайлгахгүйгээр тооцоолох
     const angle = Math.random() * 2 * Math.PI; // Санамсаргүй өнцөг
     const radius = Math.random() * maxMove; // 0-200px доторх санамсаргүй зай

     const offsetX = Math.cos(angle) * radius;
     const offsetY = Math.sin(angle) * radius;

     const newX = centerX + offsetX;
     const newY = centerY + offsetY;

     button.style.position = "absolute";
     button.style.left = `${newX}px`;
     button.style.top = `${newY}px`;
   }
 };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 font-quicksand w-screen">
      {!showLoader && !showResult && (
        <Image src="/hamster.jpg" alt="" width={400} height={400} />
      )}
      <Head>
        <title>Do You Love Me?</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,  heigth=device-heigth"
        />
      </Head>
      {showQuestion && (
        <div className="text-center ">
          <h2 className="text-4xl font-bold mb-6">Do you love me?</h2>
          <div className="relative flex justify-center gap-6">
            <button
              className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg shadow-lg hover:bg-pink-400"
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="px-6 py-3 bg-gray-300 text-black rounded-full text-lg shadow-lg"
              onMouseOver={handleNoHover}
            >
              No
            </button>
          </div>
        </div>
      )}
      {showLoader && (
        <div className="mt-10 text-red-500 text-6xl animate-heartbeat">❤️</div>
      )}
      {showResult && (
        <div className="text-center flex flex-col justify-center items-center">
          <video
            className="rounded-lg mb-4"
            src="/cute.mp4"
            autoPlay
            loop
            controls
          />
          <h2 className="text-4xl font-bold">
            medeed bsima!! gehdee bi chamd hairgue
          </h2>
        </div>
      )}
    </div>
  );
}
