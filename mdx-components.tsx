import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";

import { CodeTabs } from "@/components/ui/code-tabs";
import { CodeCollapsibleWrapper } from "@/components/ui/code-collapsible-wrapper";
import { ComponentSource } from "@/components/ui/component-source";
import { TabsListInstallType } from "@/components/ui/tabs-list-install-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,

    CodeTabs,
    CodeCollapsibleWrapper,
    ComponentSource,
    TabsListInstallType,
    ...components,
  };
}
