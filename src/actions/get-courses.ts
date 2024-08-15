import { GetProgress } from "./User-Progres";
import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  chapter: { id: string }[];
  category: Category | null;
  progress: number | null;
};

type GetCourseType = {
  userId: string;
  title?: string;
  CategoryId?: string;
};

export const GetCourse = async ({
  userId,
  title,
  CategoryId,
}: GetCourseType): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const Courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title?.toLowerCase(),
        },
        CategoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    const courseswithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        Courses.map(async (course) => {
          if (course.purchase.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await GetProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return courseswithProgress;
  } catch (error) {
    return [];
  }
};
