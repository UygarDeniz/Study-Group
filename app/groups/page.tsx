import GroupCard from "../(components)/GroupCard";
import { FaSearch } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { db } from "../_utils/db";

type Group = {
  id: number;
  name: string;
  description: string;
};
async function getGroups(name: string, page: number) {
  const pageSize = 5;
  const groups: Group[] = await db.group.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    skip: page > 1 ? (page - 1) * pageSize : 0,
    take: pageSize,
  });

  return groups;
}
async function handleSearch(formData: FormData) {
  "use server";
  const name = formData.get("search") as string;
  name ? redirect(`/groups?name=${name}`) : redirect(`/groups`);
}
export default async function Groups({ searchParams }) {
  const name = searchParams?.name as string;
  const page = parseInt(searchParams?.page || 1) as number;
  const groups = await getGroups(name, page);

  return (
    <main>
      <div
        className="relative bg-cover bg-center h-[350px]"
        style={{ backgroundImage: "url('/community2.jpg')" }}
      >
        <h1 className="text-6xl font-bold text-white text-center pt-20">
          Discover Groups
        </h1>
        <div className="absolute inset-0 flex items-center justify-center h-full mt-8">
          <form
            action={handleSearch}
            className="flex items-center bg-white rounded-3xl w-1/3"
          >
            <FaSearch className="text-gray-500 text-2xl ml-4" />
            <input
              type="text"
              placeholder="Search groups..."
              name="search"
              className="px-4 py-2 rounded-3xl text-lg w-full focus:outline-none"
            />
          </form>
        </div>
      </div>

      {groups.length !== 0 ? (
        <>
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
        </>
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-3xl font-bold text-gray-500">No groups found</h1>
        </div>
      )}
      <div className="flex  justify-center">
        <Link
          href={`/groups?page=${page > 1 ? page - 1 : 1}`}
          className="border border-black py-2 px-4"
        >
          <FaArrowLeft />
        </Link>
        <Link
          href={`/groups?page=${page + 1}`}
          className="border border-black py-2 px-4 "
        >
          <FaArrowRight />
        </Link>
      </div>
    </main>
  );
}
