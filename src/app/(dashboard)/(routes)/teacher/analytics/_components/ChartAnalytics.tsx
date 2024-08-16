"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}
const ChartAnalytics = ({ data }: ChartProps) => {
  console.log(data);

  return (
    <div className="mt-5 flex flex-wrap gap-x-4 items-center flex-col max-lg:gap-y-4">
      <ChartContainer config={chartConfig} className=" min-h-[200px] w-full">
        <BarChart data={data} className="px-5 ">
          <CartesianGrid vertical />
          <XAxis
            dataKey="name"
            tickMargin={10}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            tickMargin={10}
            stroke="#888888"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartAnalytics;
