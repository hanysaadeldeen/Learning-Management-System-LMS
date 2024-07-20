"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TeacherCourses = () => {
  return (
    <section className="p-4">
      <Link href={"/teacher/create"}>
        <Button> Create Course</Button>
      </Link>
    </section>
  );
};

export default TeacherCourses;
