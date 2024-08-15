import CourseCard from "@/components/Course-Card";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-up");
  }

  const GetAllCourses = await db.purchase.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        include: {
          category: true,
          chapter: {
            where: {
              isPublished: true,
            },
          },
          purchase: true,
        },
      },
    },
  });

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <div className="flex flex-col h-full gap-8 p-5">
      <div className="profile-card bg-gray-100 p-6 rounded-lg shadow-md flex items-center gap-x-5">
        <Image
          src={user?.imageUrl!}
          width={100}
          height={100}
          alt="userImage"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {user?.fullName}
          </h2>
          <p className="text-gray-600 mb-2">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center text-gray-600 space-x-2 mb-2">
            <p>Joined:</p>
            <p> {formatDate(user?.createdAt!)}</p>
          </div>
          <div className="flex items-center text-gray-600 space-x-2 mb-4">
            <p>Last Active:</p>
            <p>{formatDate(user?.lastActiveAt!)}</p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Courses</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {GetAllCourses.map((item) => (
          <CourseCard
            key={item.course.id}
            id={item.course.id}
            title={item.course.title}
            imgUrl={item.course.imgUrl!}
            chapterLength={item.course.chapter.length}
            price={item.course.price!}
            category={item.course.category?.name!}
          />
        ))}
        {GetAllCourses && GetAllCourses.length === 0 && (
          <h1 className="text-center text-slate-500 mt-10">No Courses Found</h1>
        )}
      </div>
    </div>
  );
}
