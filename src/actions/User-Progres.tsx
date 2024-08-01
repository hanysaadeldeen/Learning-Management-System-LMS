import { db } from "@/lib/db";

export const GetProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    const ValiedCmpletedChapter = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (ValiedCmpletedChapter / publishedChaptersIds.length) * 100;
    return progressPercentage;
  } catch (error: any) {
    return 0;
  }
};
