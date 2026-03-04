import { type Registry } from "shadcn/schema";
import { ui } from "./registry-ui";


export const registry = {
  name: "zenincharts",
  homepage: "https://charts.zenin.design/",
  items: [...ui],
} satisfies Registry;
