import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDetectionRate,
  getTotalEmailsChecked,
  getTotalUrlsChecked,
} from "@/actions/statsActions";

const CardsStats = async () => {
  const [totalUrls, totalEmails, detectionRate] = await Promise.all([
    getTotalUrlsChecked(),
    getTotalEmailsChecked(),
    getDetectionRate(),
  ]);
  return (
    <section className="container flex gap-3 flex-wrap justify-center my-4">
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Total URLS Checked</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{totalUrls}</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Total Emails Checked</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{totalEmails}</p>
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
          <p>{detectionRate}</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default CardsStats;
