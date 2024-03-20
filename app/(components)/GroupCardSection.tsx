import GroupCard from "./GroupCard";
import {db} from "@/app/_utils/db";
import { unstable_noStore as noStore } from "next/cache";

export default async function GroupCardSection() {
  noStore();

  const groups = await db.group.findMany();
  return (
    <section className="flex flex-col items-center py-20 my-6 mx-6 lg:mx-28">
      <div className="flex flex-wrap justify-center gap-10 mt-20 ">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id.toString()}
            name={group.name}
            description={group.description}
          />
        ))}
      </div>
    </section>
  );
}
