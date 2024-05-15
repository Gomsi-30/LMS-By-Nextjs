"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { Badge, Grip, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChaptersList = ({ onEdit, onReorder, items }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
     console.log(result)
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChapters(items);
    const bulkUpdateData = items.map((chapter) => ({
      id: chapter._id,
      position: items.findIndex((item) => item._id === chapter._id)
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter._id}
                draggableId={String(chapter._id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-lg mb-4 text-sm ${
                      chapter.isPublished ? "bg-sky-100 border-sky-200 text-sky-700" : ""
                    }`}
                  >
                    <div
                      className={`px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-lg transition ${
                        chapter.isPublished ? "border-r-sky-200 hover:bg-sky-200" : ""
                      }`}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5"/>
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Button className={` h-[34px] w-[80px] bg-slate-300 rounded-[5px] ${chapter.isPublished ? "bg-sky-500" : ""}`}>Free</Button>}
                      <Button className={`rounded-[5px]  h-[34px] bg-slate-300 ${chapter.isPublished ? "bg-sky-500" : ""}`}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Button>
                      <Pencil 
                        onClick={() => onEdit(chapter._id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
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

export default ChaptersList;
