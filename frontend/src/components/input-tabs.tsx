"use client";
import { FormEvent, useState } from "react";
import axios from "@/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InputTabs = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const handleUrlSubmit = async () => {
    console.log("inside the function");

    try {
      setLoading(true);
      setError("");
      setResult("");

      const response = await axios.post("/predict", {
        url,
      });

      console.log("reached here");

      console.log(response.data);
      setResult(response.data.prediction);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Tabs defaultValue="url" className="w-[800px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="url">URL Checker</TabsTrigger>
        <TabsTrigger value="email">Email Checker</TabsTrigger>
      </TabsList>
      <TabsContent value="url">
        <Card>
          <CardHeader>
            <CardTitle>Site URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 w-full flex items-end gap-3">
            <div className="space-y-1 grow">
              <Label htmlFor="url">URL</Label>
              <Input
                className="w-full"
                id="url"
                name="url"
                placeholder="faacebook.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleUrlSubmit} disabled={loading}>
              Check
            </Button>
            {result && (
              <p
                className={`capitalize ${
                  result === "good" ? "text-green-500" : "text-red-500"
                }`}
              >
                {result}
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 w-full flex items-end gap-3">
            <div className="space-y-1 grow">
              <Label htmlFor="email">Email</Label>
              <Input
                className="w-full"
                name="email"
                id="email"
                placeholder="teest@gmail.com"
              />
            </div>
            <Button>Check</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InputTabs;
