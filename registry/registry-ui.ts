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
      {
        path: "registry/default/ui/crypto-price-chart-data.ts",
        type: "registry:component",
      },
    ],
  },
  {
    name: "members-growth-chart",
    type: "registry:component",
    title: "Members Growth Chart",
    description:
      "Sleek analytics chart with tabbed segments and gradient area visualization.",
    dependencies: [
      "recharts",
      "motion",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
    ],
    registryDependencies: [],
    files: [
      {
        path: "registry/default/ui/members-growth-chart.tsx",
        type: "registry:component",
      },
      {
        path: "registry/default/ui/members-growth-chart-data.ts",
        type: "registry:component",
      },
    ],
  },
  {
    name: "momentum-chart",
    type: "registry:component",
    title: "Momentum Chart",
    description:
      "Displays a metric’s value, change, and trend to highlight momentum over time.",
    dependencies: [
      "recharts",
      "motion",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
    ],
    registryDependencies: [],
    files: [
      {
        path: "registry/default/ui/momentum-chart.tsx",
        type: "registry:component",
      },
      {
        path: "registry/default/ui/dot-pattern.tsx",
        type: "registry:component",
      },
    ],
  },
];
