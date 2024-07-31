import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";

const SearchPage = async () => {
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
    </div>
  );
};

export default SearchPage;
