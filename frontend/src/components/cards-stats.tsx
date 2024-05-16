import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardsStats = () => {
  return (
    <section className="container flex gap-3 flex-wrap justify-center my-4">
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Total URLS Checked</CardTitle>
        </CardHeader>
        <CardContent>
          <p>3814</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Total Emails Checked</CardTitle>
        </CardHeader>
        <CardContent>
          <p>1823</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Detection Rate</CardTitle>
          <CardDescription>
            Percent of emails and urls marked as phishing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>28%</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default CardsStats;
