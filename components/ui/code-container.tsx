"use client";

import { useState } from "react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Button } from "@/components/ui/button";

interface CodeContainerProps {
  title?: string;
  children: React.ReactNode;
}

export function CodeContainer({ title, children }: CodeContainerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">

      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-sm text-neutral-400">
          <span>{title}</span>
        </div>
      )}

      {/* Code */}
      <div className={expanded ? "" : "max-h-[400px] overflow-hidden"}>
        <CodeBlock>
          <Pre>{children}</Pre>
        </CodeBlock>
      </div>

      {/* Expand Button */}
      <div className="flex justify-center py-2 border-t border-neutral-800">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>

    </div>
  );
}