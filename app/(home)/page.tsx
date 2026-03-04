import { ZeninChartsLanding } from "@/components/landing/zenin-landing";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <ZeninChartsLanding />
    </div>
  );
}
