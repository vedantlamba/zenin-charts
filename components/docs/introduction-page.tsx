import Link from "next/link";

export const IntroductionPage = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div>
          <span className="text-muted-foreground text-lg">やあ、ようこそ。</span>
          <h1 className="text-4xl font-semibold tracking-tight">
            Yaa, youkoso 🌸
          </h1>
        </div>
      </div>

      <div className="space-y-4 text-muted-foreground leading-7">
        <p>
          Zenin Charts is a collection of beautifully animated chart
          components built primarily with{" "}
          <span className="text-foreground font-medium">Next.js</span>,{" "}
          <span className="text-foreground font-medium">TailwindCSS</span>,{" "}
          <span className="text-foreground font-medium">TypeScript</span>,{" "}
          <span className="text-foreground font-medium">Shadcn</span>,{" "}
          <span className="text-foreground font-medium">Motion</span> and{" "}
          <span className="text-foreground font-medium">Recharts</span>.
        </p>

        <p>
          This chart library lives under the main component system{" "}
          <Link
            href="https://www.zenin.design/"
            className="text-foreground font-medium underline"
          >
            zenin.design
          </Link>
          . It is designed to be simple and plug-and-play — all you need to do
          is copy and paste the components into your project and start using
          them immediately.
        </p>

        <p>
          If you have basic knowledge of Next.js or React, integrating these
          components into your application is straightforward and smooth.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Why I Built This
        </h2>

        <p className="text-muted-foreground leading-7">
          I started building these charts while practicing my design and
          frontend skills...
        </p>

        <p className="text-muted-foreground leading-7">
          Over time, I realized I had built a solid collection...
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Design & Progress
        </h2>

        <p className="text-muted-foreground leading-7">
          I regularly share my design experiments and development progress on{" "}
          <Link
            href="https://x.com/Vedantlamba"
            target="_blank"
            className="text-foreground font-medium underline"
          >
            Twitter
          </Link>
          .
        </p>
      </div>
    </div>
  );
};