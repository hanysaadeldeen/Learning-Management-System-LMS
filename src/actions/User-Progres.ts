import { db } from "@/lib/db";

export const GetProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    // for get All Chapter for unique Course that is pupblic
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    // for extract All Id for this chapter
    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    // first make sure that this chapter is in all id in the course and course and is completed
    const ValiedCmpletedChapter = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });

    //get number
    const progressPercentage =
      (ValiedCmpletedChapter / publishedChaptersIds.length) * 100;
    return progressPercentage;
  } catch (error: any) {
    return 0;
  }
};
