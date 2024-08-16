import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type dataCardType = {
  title: string;
  total: number;
  description: string;
  shouldFormat?: boolean;
};

const DataCard = ({
  title,
  total,
  shouldFormat,
  description,
}: dataCardType) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-xl">
          {shouldFormat ? `$ ${total}.00` : total}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
