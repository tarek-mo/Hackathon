"use client";
import { useState } from "react";
import axios from "@/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
const InputTabs = ({ userId }: { userId: string | undefined }) => {
  const [result, setResult] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleUrlSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const response = await axios.post("/predict", {
        url,
        userId,
        type: "website",
      });

      setResult(response.data.prediction);
    } catch (error) {
      console.log("error", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleEmailSubmit = async () => {
    try {
      setEmailLoading(true);
      setEmailError("");
      setEmailResult("");

      const response = await axios.post("/predict_email", {
        email_text: email,
        userId,
        type: "email",
      });
      console.log(response);

      setEmailResult(response.data.prediction);
    } catch (error) {
      console.log("error", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setEmailLoading(false);
    }
  };
  return (
    <Tabs defaultValue="url" className="w-[800px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="url">URL Checker</TabsTrigger>
        <TabsTrigger value="email">Email Body Checker</TabsTrigger>
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
          </CardContent>
          <div className="p-6">
            {result === "bad" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Danger</AlertTitle>
                <AlertDescription>
                  This website is likely to be phishing. It&apos;s recommended
                  not to use it.{" "}
                </AlertDescription>
              </Alert>
            )}
            {result === "good" && (
              <Alert className="border-green-500">
                <Check color="green" className="h-4 w-4 text-green-500" />
                <AlertTitle>Safe</AlertTitle>
                <AlertDescription>
                  This website seems safe to use.{" "}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Email Body Checker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 w-full flex items-end gap-3">
            <div className="space-y-1 grow">
              <Label htmlFor="email">Email Body Text</Label>
              <Input
                className="w-full"
                id="email"
                name="email"
                placeholder="Congratulations you won the cash prize"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleEmailSubmit} disabled={emailLoading}>
              Check
            </Button>
          </CardContent>
          <div className="p-6">
            {emailResult === "Phihsing" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Danger</AlertTitle>
                <AlertDescription>
                  This email is likely to be phishing. It&apos;s recommended not
                  to interact with it.
                </AlertDescription>
              </Alert>
            )}
            {emailResult === "Not Phishing" && (
              <Alert className="border-green-500">
                <Check color="green" className="h-4 w-4 text-green-500" />
                <AlertTitle>Safe</AlertTitle>
                <AlertDescription>
                  This email seems safe to interact with.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InputTabs;
