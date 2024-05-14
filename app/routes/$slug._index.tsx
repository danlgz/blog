import { LinksFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getFileFromPublic } from "~/utils/fs.server";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import MDX from "~/components/MDX";
import markdownStyles from "~/styles/markdown.css?url";
import rehypeHighlight from 'rehype-highlight';
import {visit} from 'unist-util-visit'


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
  const { content, data } = await getMarkdown(slug as string);
  return json({
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
                  console.log(tree)
                  node.properties = {
                    raw: node.raw,
                  };
                  // console.log(node.raw)
                }
              });
            },
            rehypeHighlight,
          ],
          remarkPlugins: [
            [
              remarkEmbedder,
              {transformers: [oembedTransformer]}
            ]
          ],
        }
      )
    ),
    meta: data,
  })
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

export default function SlugPostRoute() {
  const { code } = useLoaderData<typeof loader>();

  return (
    <div className="markdown">
      <MDX code={code} />
    </div>
  )
}
