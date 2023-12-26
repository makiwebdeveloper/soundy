import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  items: {
    id: number;
    name: string;
    imageUrl: string;
    url: string;
  }[];
}

export default function SearchItem({ name, items }: Props) {
  return (
    <div>
      <h6 className="font-semibold text-xl capitalize">{name}</h6>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="flex items-center gap-3 p-3 transition dark:hover:bg-black/40 rounded-md"
        >
          <div className="relative w-[50px] h-[50px] rounded-md">
            <Image
              fill
              src={item.imageUrl}
              alt={item.name}
              className="object-contain rounded-md bg-white/20 dark:bg-black/20"
            />
          </div>
          <p className="font-medium">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
