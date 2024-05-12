type Props = {
  title: string;
  date: Date;
  spoiler: string;
}

export default function PostListItem({ title, date, spoiler }: Props) {
  return (
    <div>
      <div className="flex flex-row justify-between items-baseline">
        <h2 className="font-medium">{title}</h2>
        <span className="font-extralight">{date.toLocaleDateString()}</span>
      </div>
      <p className="mt-2 text-justify font-light">
        {spoiler}
      </p>
    </div>
  )
}
