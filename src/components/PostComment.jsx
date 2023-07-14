import * as React from "react";
import GrayBG from "@/assets/images/gray-bg.jpg";
import { useQuery } from "react-query";

const getUserById = (userId, users) => users.find((user) => user.id === userId);

export default function PostComment({ modal, setModal, comment, ...props }) {
  const users = useQuery("users", () => api.users.profiles(), {
    initialData: [],
  });
  const user = users.data
    ? getUserById(comment.created_by, users.data)
    : { avtar: GrayBG, first_name: "&nbsp;", last_name: "&nbsp;" };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 p-4 pl-0">
      <img
        className="h-8.5 w-8.5 rounded-full object-cover"
        src={user.avtar}
      />

      <div className="relative ">
        <div className="rounded-[15px] rounded-tl-none bg-paper px-[30px] pb-[20px] pt-[7px] text-[#464646]">
          <p className="text-18px">
            <span className="font-bold">{user.first_name}</span>
            <br />
            <span className="ml-2">{comment.comment}</span>
          </p>

          {comment.image || comment.gif ? (
            <div className="mt-[21px] space-y-[20px]">
              {comment.image && (
                <img className="w-full rounded-md" src={comment.image} />
              )}
              {comment.gif && <img className="w-full rounded-md" src={comment.gif} />}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
