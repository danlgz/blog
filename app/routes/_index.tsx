import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import PostListItem from "~/components/PostListItem";

export const meta: MetaFunction = () => {
  return [
    { title: "Daniel Lucas – Blog" },
    { name: "description", content: "Some description about the blog" },
  ];
};

export default function Index() {
  return (
    <main className="w-full max-w-screen-md mx-auto pt-16 px-4 lg:px-0">
      <div className="flex flex-row justify-between items-center">
        <h1>Daniel Lucas – Blog</h1>
        <Link to="https://danlgz.io" target="_blank" rel="noreferrer"><span>About</span></Link>
      </div>
      <p className="font-extralight mt-4 text-sm">Software Development / Management / Entrepreneurship</p>

      <div className="mt-12 flex flex-col gap-8">
        <PostListItem
          title="title"
          date={new Date()}
          spoiler="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        />

        <PostListItem
          title="title"
          date={new Date()}
          spoiler="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        />

        <PostListItem
          title="title"
          date={new Date()}
          spoiler="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        />
      </div>
    </main>
  );
}
