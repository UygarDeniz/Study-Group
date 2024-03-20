
import { changeGroupsDetails } from "@/app/actions/actions";
import { db } from "@/app/_utils/db";
const getGroup = async (groupId: string) => {
  try {
    const group = await db.group.findUnique({
      where: { id: Number(groupId) },
      include: {
        GroupMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        GroupAdmin: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    return group;
  } catch (error) {
    console.error(error);
  }
};
export default async function GroupSettings({ params }) {
  const { groupId } = params;

  const group = await getGroup(groupId);
  const changeGroupsDetailsWithGroupId = changeGroupsDetails.bind(null, groupId);
  if (!group) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-8 text-center  font-semibold text-xl text-gray-700">
        <h2 className="font-bold text-2xl">Group Settings</h2>
        <p className="text-lg text-gray-600 font-normal">
          Manage your group settings.
        </p>
      </div>
      <hr className="mb-8 mt-1 border border-black w-full" />
      <form className="space-y-6" action={changeGroupsDetailsWithGroupId}>
        <div className="relative">
          <input
            type="text"
            name="name"
            className="w-[500px] border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
            required
            maxLength={20}
            defaultValue={group.name}
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-0 text-gray-600 text-md"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <textarea
            name="description"
            className="w-[500px] border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
            rows={7}
            required
            maxLength={255}
            defaultValue={group.description}
          />
          <label
            htmlFor="description"
            className="absolute left-3 top-0 text-gray-600 text-md"
          >
            Description
          </label>
        </div>
        <button className="border border-black px-4 py-3 text-white  w-full bg-black">
          Save
        </button>
      </form>
    </div>
  );
}
