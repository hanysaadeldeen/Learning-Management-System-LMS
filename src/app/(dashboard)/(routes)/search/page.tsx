import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import CoursesList from "@/components/Courses-List";

type SearchParamsType = {
  searchParams: { title: string; category: string };
};
const SearchPage = async ({ searchParams }: SearchParamsType) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  console.log(searchParams);

  const AllCategories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-4 md:p-10  ">
      <div className="w-full md:hidden my-3">
        <SearchInput />
      </div>
      <Categories items={AllCategories} />
      <CoursesList />
    </div>
  );
};

export default SearchPage;
