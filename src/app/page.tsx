"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [displayText, setDisplayText] = useState("");
const text = "mmedeed bsima!! gehdee bi chamd hairgue".trim();

  const startTypewriterEffect = useCallback(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + (text[i] || "")); // undefined-ийг алгасах
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, [text]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (showLoader) {
      timer = setTimeout(() => {
        setShowLoader(false);
        setShowResult(true);
        startTypewriterEffect();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [showLoader, startTypewriterEffect]);


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
      const centerX = containerRect.width / 2 - buttonWidth / 2;
      const centerY = containerRect.height / 2 - buttonHeight / 2;
      const maxMove = 200;
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * maxMove;
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
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 font-quicksand w-screen relative">
      {showQuestion && (
        <Image src="/hamster.jpg" alt="Cute Hamster" width={400} height={400} />
      )}
      <Head>
        <title>Do You Love Me?</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, height=device-height"
        />
      </Head>
      {showQuestion && (
        <div className="text-center">
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
        <div className="mt-10 text-red-500 text-6xl animate-ping">❤️</div>
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
          <div className="text-center flex flex-col justify-center items-center">
            {showResult && (
              <motion.h2
                className="text-4xl font-bold text-500 overflow-auto  border-white whitespace-normal w-[375px] h-auto max-h-[200px]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {displayText || ""}
              </motion.h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
