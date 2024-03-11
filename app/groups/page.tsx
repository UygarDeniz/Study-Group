import GroupCard from "../(components)/GroupCard";
import { FaSearch } from "react-icons/fa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Group = {
  id: number;
  name: string;
  description: string;
};
async function getGroups(){
  const groups: Group[] = await prisma.group.findMany();
  return groups;

}
export default async function Groups() {
  
  const groups = await getGroups();
  return (
    <>
      <div
        className="relative bg-cover bg-center h-[350px]" 
        style={{ backgroundImage: "url('/community2.jpg')" }}
      >
        <h1 className="text-6xl font-bold text-white text-center pt-20">
          Discover Groups
        </h1>
        <div className="absolute inset-0 flex items-center justify-center h-full mt-8">
          <div className="flex items-center bg-white rounded-3xl w-1/3">
            <FaSearch className="text-gray-500 text-2xl ml-4" />
            <input
              type="text"
              placeholder="Search groups..."
              className="px-4 py-2 rounded-3xl text-lg w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
      <section className="flex flex-wrap justify-center py-20 mt-6 mx-6 lg:mx-28 gap-6">
        {groups.map((group) => (
          <GroupCard
            key={group.name}
            id={group.id.toString()}
            name={group.name}
            description={group.description}
          />
        ))}
      </section>
    </>
  );
}
