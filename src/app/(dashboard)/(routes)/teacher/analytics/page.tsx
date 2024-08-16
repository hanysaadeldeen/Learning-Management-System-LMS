import { getAnalytics } from "@/actions/get-Analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";

const AlanyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  console.log(data);
  console.log(totalRevenue);
  console.log(totalSales);

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-4">
        <DataCard
          title={"Total Revenue"}
          total={totalRevenue}
          shouldFormat
          description={"Track overall earnings seamlessly."}
        />
        <DataCard
          title={"Total Sales"}
          total={totalSales}
          description="Monitor all sales transactions easily."
        />
      </div>
    </div>
  );
};

export default AlanyticsPage;
