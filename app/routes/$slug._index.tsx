import { LinksFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getFile } from "~/utils/fs.server";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import MDX from "~/components/MDX";
import markdownStyles from "~/styles/markdown.css?url";


// helpers

const getMarkdown = async (slug: string) => {
  const file = await getFile(`../posts/${slug}/index.md`);
  return matter(file);
}

// Remix functions

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: markdownStyles },
]

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  const { content, data } = await getMarkdown(slug as string);
  return json({
    code: String(await compile(content, { outputFormat: 'function-body' })),
    meta: data,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.meta.title} – Daniel Lucas Blog`,
    }
  ]
}


// final page

export default function SlugPostRoute() {
  const { code } = useLoaderData<typeof loader>();

  return (
    <div className="markdown">
      <MDX code={code} />
    </div>
  )
}
