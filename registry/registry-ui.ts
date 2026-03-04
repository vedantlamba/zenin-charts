import { type Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "crypto-price-chart",
    type: "registry:component",
    title: "Crypto Price Chart",
    description:
      "Interactive animated crypto price chart with tabs and holdings summary.",
    dependencies: [
      "recharts",
      "motion",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
    ],
    registryDependencies: [],
    files: [
      {
        path: "registry/default/ui/crypto-price-chart.tsx",
        type: "registry:component",
      },
    ],
  },
];
