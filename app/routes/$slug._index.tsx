import { LinksFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getFileFromPublic } from "~/utils/fs.server";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import MDX from "~/components/MDX";
import markdownStyles from "~/styles/markdown.css?url";
import rehypeHighlight from 'rehype-highlight';
import {visit} from 'unist-util-visit'
import remarkGfm from 'remark-gfm'


// Note: `@remark-embedder` is currently using faux-esm.
// eslint-disable-next-line
import fauxRemarkEmbedder from '@remark-embedder/core'
import fauxOembedTransformer from '@remark-embedder/transformer-oembed'

// @ts-expect-error: `remarkEmbedder` types are wrong.
const remarkEmbedder = fauxRemarkEmbedder.default;
// @ts-expect-error: `remarkEmbedder` types are wrong.
const oembedTransformer = fauxOembedTransformer.default;


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

    const readTime = Math.ceil(content.split(' ').length / 200);

    return json({
      readTime,
      code: String(
        await compile(
          content,
          {
            outputFormat: 'function-body',
            rehypePlugins: [
              () => (tree) => {
                visit(tree, (node) => {
                  if (node?.type === "element" && node?.tagName === "pre") {
                    const [codeEl] = node.children;

                    if (codeEl.tagName !== "code") return;

                    node.raw = codeEl.children?.[0].value;
                    node.properties = {
                      raw: node.raw,
                    };
                  }
                });
              },
              rehypeHighlight,
            ],
            remarkPlugins: [
              remarkGfm,
              [
                remarkEmbedder,
                {transformers: [oembedTransformer]},
              ]
            ],
          }
        )
      ),
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


// final page
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    className="stroke-main dark:stroke-main-dark inline w-5 h-5 align-sub"
  >
    <path
      strokeLinecap="round"
      d="M12 21V7a2 2 0 012-2h7.4a.6.6 0 01.6.6v13.114M12 21V7a2 2 0 00-2-2H2.6a.6.6 0 00-.6.6v13.114M14 19h8M10 19H2"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a2 2 0 012-2M12 21a2 2 0 00-2-2"
    ></path>
  </svg>
)

export default function SlugPostRoute() {
  const { code, meta, readTime } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-col gap-2 py-8">
        <h1>{meta.title}</h1>
        <span><ClockIcon /> ~{readTime}min • {(new Date(meta.date)).toLocaleDateString()}</span>
      </div>
      <article className="markdown">
        <MDX code={code} />
      </article>
    </div>
  )
}
