"use client";

import { Chapter } from "@prisma/client";
import { useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ChapterLityType = {
  onEdit: (id: string) => void;
  items: Chapter[];
  onRecord: (updateData: { id: string; position: number }[]) => void;
};

export const ChapterList = ({ onEdit, items, onRecord }: ChapterLityType) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chpaters, setShapters] = useState(items);
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="chpaters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chpaters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border my-3 text-slate-700 border-slate-200 rounded-md text-sm",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 border-r py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished && "border-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5 " />
                    </div>
                    {chapter.chapterTitle}
                    <div
                      className={cn("ml-auto pr-2 flex items-center gap-x-2")}
                    >
                      {chapter.ifFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500 ",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "PUblished" : "Draft"}
                      </Badge>
                      <Pencil
                        className="w-4 h-4 cursor-pointer transition hover:opacity-70"
                        onClick={() => onEdit(chapter.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
