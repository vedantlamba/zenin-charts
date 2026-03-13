import { Button } from "@/components/ui/button";
import {
  ArrowRight02Icon,
  StarIcon,
  StartUp01Icon,
  Sword01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Link from "next/link";
import { instrumentSerif } from "@/app/layout";
import { CryptoPriceChart } from "../charts/crypto-price-chart";
import { cryptoChartData } from "../charts/data/crypto-price-chart-data";
import { RevenueTrends } from "../charts/revenue-trends";

export const ZeninChartsLanding = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-neutral-900 dark:text-neutral-200 text-[16px]">
            ゼニンチャーツ
          </span>
          <h1
            className={`${instrumentSerif.className} text-5xl md:text-6xl font-semibold tracking-tight`}
          >
            <span className="text-[#1B3A2E] dark:text-[#FFB7C5]">Zenin</span>{" "}
            Charts
          </h1>
          <p className="text-balance text-neutral-600 dark:text-neutral-200 text-xs md:text-[15px] font-semibold">
            The Coolest React Chart Components on the Planet.{" "}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            className="cursor-pointer flex items-center justify-center text-xs md:text-sm"
          >
            <Link href="/docs">
              <HugeiconsIcon icon={ArrowRight02Icon} />
              Get Started
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="cursor-pointer flex items-center justify-center text-xs md:text-sm"
          >
            <Link
              href="https://github.com/vedantlamba/zenin-charts"
              target="_blank"
            >
              <HugeiconsIcon
                icon={StarIcon}
                className="text-yellow-400 fill-amber-400 size-4"
              />
              Star Github
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-8">
        <div className="relative">
          <div className="relative z-10">
            <CryptoPriceChart
              title="Bitcoin"
              quantityOwned={2.66346}
              chartData={cryptoChartData}
            />
          </div>
          <div className="hidden lg:block lg:absolute top-0 right-40 z-5">
            {/* <MomentumCard /> */}
          </div>
          <div className="hidden lg:block lg:absolute top-0 left-60 z-5">
            {/* <MembersGrowthChart /> */}
            {/* <RevenueTrends/> */}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            If Zenin helps you, consider supporting the{" "}
            <Link
              target="_blank"
              href="https://buymeacoffee.com/vedantlamba"
              className="text-black hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-100 transition-colors duration-300 underline underline-offset-2 font-semibold"
            >
              project
            </Link>{" "}
            .
          </p>
        </div>
      </div>
    </div>
  );
};
