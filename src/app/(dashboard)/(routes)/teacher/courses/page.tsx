// "use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
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

  console.log(GetAllCourses);

  return (
    <section className="p-4">
      <Link href={"/teacher/create"}>
        <Button> Create Course</Button>
      </Link>
      <DataTable columns={columns} data={GetAllCourses} />
    </section>
  );
};

export default TeacherCourses;
