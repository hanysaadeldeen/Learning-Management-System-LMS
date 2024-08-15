import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import CoursesList from "@/components/Courses-List";
import { GetCourse } from "@/actions/get-courses";

type SearchParamsType = {
  searchParams: { title: string; category: string };
};
const SearchPage = async ({ searchParams }: SearchParamsType) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const AllCategories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.log(searchParams);

  const AllCourses = await GetCourse({
    userId,
    ...searchParams,
  });

  return (
    <div className="p-4 md:p-10  ">
      <div className="w-full md:hidden my-3">
        <SearchInput />
      </div>
      <div className="space-y-2">
        <Categories items={AllCategories} />
        <CoursesList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default SearchPage;
