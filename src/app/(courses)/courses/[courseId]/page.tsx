import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SpecificCourse = async ({ params }: { params: { courseId: string } }) => {
  const coursefirstChapter = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!coursefirstChapter) {
    return redirect("/");
  }

  return redirect(
    `/courses/${params.courseId}/chapter/${coursefirstChapter.chapter[0].id}`
  );
};

export default SpecificCourse;
