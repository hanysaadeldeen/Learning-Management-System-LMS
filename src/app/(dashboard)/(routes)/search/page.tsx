import { db } from "@/lib/db";
import Categories from "./_components/Categories";

const SearchPage = async () => {
  const AllCategories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-4 md:p-10  ">
      <Categories items={AllCategories} />
    </div>
  );
};

export default SearchPage;
