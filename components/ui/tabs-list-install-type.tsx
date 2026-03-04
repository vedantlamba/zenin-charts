import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsListInstallType() {
  return (
    <TabsList>
      <TabsTrigger value="cli">Command</TabsTrigger>
      <TabsTrigger value="manual">Manual</TabsTrigger>
    </TabsList>
  );
}
