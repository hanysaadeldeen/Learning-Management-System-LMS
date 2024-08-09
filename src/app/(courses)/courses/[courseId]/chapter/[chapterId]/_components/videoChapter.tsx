"use client";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";

type VideoPlayerChapterType = {
  chapterId: string;
  title: string;
  vidUrl: string;
  courseId: string;
  nextChapterId?: string;
  playBackId: string;
  islocked: boolean;
  completeOnEnd: boolean;
};

const VideoChapter = ({
  chapterId,
  vidUrl,
  title,
  courseId,
  nextChapterId,
  playBackId,
  islocked,
  completeOnEnd,
}: VideoPlayerChapterType) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="relative aspect-video">
      {!islocked && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className=" h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {islocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <p className="text-white text-lg mr-3">This Chapter Is Locked</p>
          <Lock className=" h-8 w-8  text-secondary" />
        </div>
      )}
      {!islocked && (
        // <MuxPlayer
        //   title={title}
        //   className={cn(!isReady && "hidden")}
        //   onCanPlay={() => setIsReady(true)}
        //   onEnded={() => {}}
        //   // autoPlay
        //   playbackId={playBackId}
        // />
        <ReactPlayer
          url={vidUrl}
          className="absolute top-0 left-0 w-full h-full"
          controls
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default VideoChapter;
