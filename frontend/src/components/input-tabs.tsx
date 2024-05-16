import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InputTabs = () => {
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
              <Input className="w-full" id="url" placeholder="faacebook.com" />
            </div>
            <Button>Check</Button>
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
