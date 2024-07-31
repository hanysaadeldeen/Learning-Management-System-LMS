// "use client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "../courses/_components/columns";
const TeacherCourses = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const GetAllCourses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <section className="p-4 ">
      <DataTable columns={columns} data={GetAllCourses} />
    </section>
  );
};

export default TeacherCourses;
