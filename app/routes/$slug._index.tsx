import { LinksFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getFileFromPublic } from "~/utils/fs.server";
import matter from "gray-matter";
import MDX from "~/components/MDX";
import markdownStyles from "~/styles/markdown.css?url";
import renderMD from "~/utils/render-md.server";
import ReadBook from "~/components/icons/ReadBook";


// helpers
const getMarkdown = async (slug: string) => {
  const file = await getFileFromPublic(`${slug}/index.md`);
  return matter(file);
}

// Remix functions
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: markdownStyles },
]

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const { content, data } = await getMarkdown(slug as string);

    // calculate read time: 200 words per minute
    const readTime = Math.ceil(content.split(' ').length / 200);

    return json({
      readTime,
      code: await renderMD(content),
      meta: data,
    })
  } catch {
    throw new Response(null, {
      status: 404,
      statusText: 'Post not found',
    });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.meta.title} – Daniel Lucas Blog`,
      description: data?.meta.description,
    }
  ]
}

export default function SlugPostRoute() {
  const { code, meta, readTime } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-col gap-2 py-8">
        <h1>{meta.title}</h1>
        <span><ReadBook /> ~{readTime}min • {(new Date(meta.date)).toLocaleDateString()}</span>
      </div>
      <article className="markdown">
        <MDX code={code} />
      </article>
    </div>
  )
}
