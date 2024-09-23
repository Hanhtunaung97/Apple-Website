import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoDivRef = useRef([]);
  const videoSpanRef = useRef([]);
  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false,
  });
  const { videoId, startPlay, isPlaying, isEnd, isLastVideo } = video;
  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);
  const handleLoadedMetaData = (i, e) => {
    setLoadedData((prev) => [...prev, e]);
  };
  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    const progressBar = videoDivRef.current;
    if (span[videoId]) {
      // animate video timeline
      let animate = gsap.to(span[videoId], {
        onUpdate: () => {
          //get progress
          const progress = Math.ceil(animate.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            //set the width of progress bar
            gsap.to(progressBar[videoId], {
              width:
                window.innerWidth <= 768
                  ? "10vw"
                  : window.innerWidth <= 1200
                  ? "10vw"
                  : "5vw",
            });
            //set the background color for progress bar
            gsap.to(span[videoId], {
              width: `${progress}%`,
              backgroundColor: "white",
            });
          }
        },
        // // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(progressBar[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId == 0) {
        animate.restart();
      }
      //update progress bar
      const animateUpdate = () => {
        animate.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animateUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animateUpdate);
      }
    }
  }, [videoId, startPlay]);
   // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center gap-1">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className=" pr-10 sm:pr-20 ">
            <div className="video-carousel_container ">
              <div className=" bg-black w-full h-full rounded-3xl overflow-hidden">
                <video
                  muted
                  playsInline={true}
                  preload="auto"
                  id="video"
                  ref={(el) => (videoRef.current[i] = el)}
                  className={`${
                    list.id == 2 && "translate-x-44"
                  }w-full h-full object-cover pointer-events-none`}
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source type="video/mp4" src={list.video} alt="video" />
                </video>
              </div>
              <div className="absolute top-10 left-6 z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="text-xl sm:text-2xl text-gray-50">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center mt-10 relative">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="w-3 h-3 mx-2 bg-gray-200 rounded-full cursor-pointer relative"
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className=" absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
