import { getAnalytics } from "@/actions/get-Analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AlanyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  console.log(data);
  console.log(totalRevenue);
  console.log(totalSales);

  return <h1>Analytics Page</h1>;
};

export default AlanyticsPage;
