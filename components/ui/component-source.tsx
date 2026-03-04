import fs from "node:fs"
import path from "node:path"
import { codeToHtml } from "shiki"
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper"

export async function ComponentSource({
  name,
  className,
  collapsible = true,
}: {
  name: string
  className?: string
  collapsible?: boolean
}) {
  const filePath = path.join(
    process.cwd(),
    "registry/default/ui",
    `${name}.tsx`
  )

  let code = ""

  try {
    code = fs.readFileSync(filePath, "utf8")
  } catch {
    code = `// Could not find file: ${filePath}`
  }

  const html = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  })

  const content = (
    <div
      className="rounded-xl border bg-muted/50 p-4 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  if (!collapsible) {
    return <div className={className}>{content}</div>
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      {content}
    </CodeCollapsibleWrapper>
  )
}