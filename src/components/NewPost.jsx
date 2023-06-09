import { api } from "@/api";
import ToolTip from "@/components/ToolTip";
import { queryClient } from "@/queryClient";
import { CreatePost, getTodayDate } from "@/utils";
import { Close, EmojiEmotions, GifBox, Image, Link } from "@mui/icons-material";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import EmojiPicker from "emoji-picker-react";
import Cookies from "js-cookie";
import * as React from "react";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import GifPicker, { GifPickerBox } from "./GifPickerPopover";
import { Dialog } from "@radix-ui/react-dialog";
import Cropper from "@/components/Cropper";
import UserImg from "@/assets/images/user-profile/pp.png";
import HelpIcon from "@/assets/svg/home-sidebar/HelpIcon";
import { MAX_IMAGE_SIZE_MB } from "@/constant";
import EmojiPickerBox from "@/components/EmojiPickerBox";
import ImagePickerBox from "@/components/ImagePickerBox";
import Spinner from "@/components/Spinner";

function validateNewPostForm(form) {
  let isValid = true;
  if (form.recipients.length === 0) {
    toast.error("Add atleast one recipient");
    isValid = false;
  }
  if (form.hashtags.length === 0) {
    toast.error("Add atleast one hashtag");

    isValid = false;
  }
  if (form.message.length === 0) {
    toast.error("Add a message");
    isValid = false;
  }
  return isValid;
}

export default function NewPost({ ...props }) {
  const me = useQuery("me", () => api.auth.me(Cookies.get("user_id")));
  const users = useQuery("users", () => api.users.profiles(), {
    initialData: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [processedImage, setProcessedImage] = React.useState("");

  const [form, setForm] = React.useState({
    point: 30,
    recipients: [],
    hashtags: [],
    image: "",
    gif: "",
    link: "",
    message: "",
  });

  return (
    <>
      <div className="z-[999]">
        {processedImage && (
          <Cropper
            imageFile={processedImage}
            onClose={(image) => {
              setProcessedImage("");
              setForm((prev) => ({ ...prev, image }));
            }}
          />
        )}
      </div>

      <div>
        <div className="rounded-t-lg  bg-primary px-6 py-2 text-sm text-white">
          <ul className="flex flex-wrap items-center gap-y-3 divide-x divide-primary-400 first:pl-0 child:pl-4">
            {/* points button */}

            <li className="group pr-4">
              <PointsRangeDialog {...{ form, setForm }} />
            </li>

            <li className="group pr-4">
              <RecipientsDropdown {...{ form, setForm }} />
            </li>

            <li className="group pr-4">
              <HashTagsDropdown {...{ form, setForm }} />
            </li>

            <li className="flex-grow" />

            <li
              style={{ borderWidth: 0 }}
              className="basis-full md:flex-shrink md:basis-auto"
            >
              <HoverCard.Root>
                <p className="flex cursor-pointer items-center font-Lato leading-4">
                  You Have{" "}
                  <span className="font-bold">
                    &nbsp;{me.data.allowance_boost} Points&nbsp;
                  </span>
                  to give
                  <HoverCard.Trigger className="ml-2 inline-flex h-4 w-4 items-center justify-center">
                    <HelpIcon />
                  </HoverCard.Trigger>
                </p>

                <HoverCard.Portal>
                  <HoverCard.Content className="z-20 w-screen max-w-[180px] rounded bg-white p-2 text-[12px] leading-[14px] text-[#747474] shadow">
                    <HoverCard.Arrow className="fill-white" />
                    You monthly allowance will refresh on 1st March. You have 6
                    days to spend 160 points.
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </li>
          </ul>
        </div>

        {/* text field */}

        <div className="_px-6 rounded-b-lg bg-white py-6 text-[#b1b1b1] drop-shadow-normal">
          <div className="px-6">
            <span className="text-[#464646]">+{form.point} </span>
            {form.recipients.length == 0 ? (
              <span>@Name.recipient</span>
            ) : (
              form.recipients
                .map((userId) =>
                  (users.data || []).find((user) => user.id === userId)
                )
                .map((user) => `@${user.first_name} ${user.last_name}`)
                .map((fullName) => (
                  <span className="text-[#464646]" key={fullName}>
                    {fullName}
                  </span>
                ))
            )}{" "}
            {form.hashtags.length == 0 ? (
              <span>#HashTag</span>
            ) : (
              form.hashtags.map((tag) => (
                <span className="text-[#464646]" key={tag}>
                  {tag}
                </span>
              ))
            )}
          </div>

          <div className="min-h-[120px] border-b px-6 focus-within:border-b focus-within:border-primary">
            <textarea
              spellCheck={false}
              className="block h-10 w-full resize-none text-[#464646]  outline-none transition-all placeholder:text-[#b1b1b1]"
              placeholder="For helping me launch a marketing campaign so that we can generate new business"
              onChange={(ev) =>
                setForm((prev) => ({
                  ...prev,
                  message: ev.target.value.substring(0, 270),
                }))
              }
              value={form.message}
            ></textarea>

            {form.image && (
              <div>
                <div className="group flex items-center pb-2">
                  <img
                    src={URL.createObjectURL(form.image)}
                    key={form.image}
                    className="mt-0.5 w-40 rounded-md border"
                  />

                  <button
                    className="ml-4 hidden group-hover:inline-block"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  >
                    <Close fontSize="10" />
                  </button>
                </div>
              </div>
            )}

            {form.gif && (
              <div>
                <div className="group flex items-center pb-2">
                  <img
                    src={form.gif}
                    key={form.image}
                    className="mt-4 w-40 border"
                  />

                  <button
                    className="ml-4 hidden group-hover:inline-block"
                    onClick={() => setForm((prev) => ({ ...prev, gif: "" }))}
                  >
                    <Close fontSize="10" />
                  </button>
                </div>
              </div>
            )}

            {form.link && (
              <div>
                <p>URL Link:</p>

                <div className="group flex items-center">
                  <a className="text-primary underline" href={form.link}>
                    {form.link}
                  </a>
                  <button
                    className="ml-4 hidden group-hover:inline-block"
                    onClick={() => setForm((prev) => ({ ...prev, link: "" }))}
                  >
                    <Close fontSize="10" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* footer */}
          <div
            id="new-post-footer"
            className="flex items-baseline gap-4 px-6 pt-3"
          >
            <EmojiPickerBox
              onClick={(emoji) => {
                setForm((prev) => ({
                  ...prev,
                  message: prev.message + emoji.emoji,
                }));
              }}
            >
              <EmojiEmotions />
            </EmojiPickerBox>

            <ImagePickerBox onChange={(image) => setProcessedImage(image)}>
              <Image />
            </ImagePickerBox>

            <GifPickerBox
              onChange={(gif) => setForm((prev) => ({ ...prev, gif }))}
            >
              <GifBox />
            </GifPickerBox>

            <AddLinkBox
              onChange={(link) => setForm((prev) => ({ ...prev, link }))}
            >
              <Link />
            </AddLinkBox>

            <button
              disabled={loading}
              type="submit"
              className="relative ml-auto w-full max-w-[6rem] rounded-sm bg-primary px-4 py-1 font-Lato text-white disabled:bg-opacity-80"
              onClick={async function newPost() {
                try {
                  setLoading(true);
                  if (!validateNewPostForm(form)) return;
                  const data = CreatePost(me.data.id, "", form);
                  const formData = toFormData(data);
                  // recipients.forEach((userId) => formData.append('recipients', userId))

                  await api.transactions.new(formData);
                  await queryClient.refetchQueries("transactions");
                  await queryClient.refetchQueries("me");

                  setForm({
                    point: 30,
                    recipients: [],
                    hashtags: [],
                    image: "",
                    gif: "",
                    link: "",
                    message: "",
                  });
                } catch {
                  toast.error("Transaction failed. Server error");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Spinner isLoading={loading} />
              Give
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function AddLinkBox({ children, onChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="group relative inline-block cursor-pointer text-iconColor">
        {children}
        <ToolTip title="Add a link" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className=" z-50">
          <AddLinkPopup onChange={onChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function AddLinkPopup({ onChange }) {
  return (
    <div className="w-screen max-w-xs rounded-md border border-[#00bc9f] bg-white p-2 pt-1">
      <p className="flex items-center justify-between text-18px text-gray-500">
        Add a link
        <Popover.Close className="rounded-sm p-px hover:bg-translucent hover:text-primary">
          <RxCross2 />
        </Popover.Close>
      </p>

      <label className="mt-3 flex items-center justify-between text-sm text-gray-600">
        Link:
        <input
          name="link"
          className="mt-1 w-44 rounded bg-translucent px-5 py-2.5 leading-5 text-primary"
          placeholder="http://"
          onChange={(ev) => onChange(ev.target.value)}
        />
      </label>
    </div>
  );
}

export function PointsRangeDialog({ form, setForm }) {
  const properties = useQuery("properties", () => api.properties());
  const points_range = properties.data?.points_range;

  const points_colors = [
    "text-[#03BFC7]",
    "text-[#0374C7]",
    "text-[#6554E3]",
    "text-[#B754E3]",
    "text-[#F46CE9]",
  ];

  return (
    <>
      <p className="flex cursor-pointer gap-[2px] hover:font-bold">
        + <span className="font-Lato"> Points</span>
      </p>
      <div className="absolute z-10 hidden gap-2 rounded-full bg-white p-2 text-black shadow group-hover:flex">
        {properties.isLoading
          ? Array(5)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-paper font-bold`}
                />
              ))
          : points_range.map((point, i) => (
              <button
                key={point}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-full font-bold hover:bg-primary  hover:text-white ${
                  form.point === point ? "bg-translucent" : ""
                } ${points_colors[i]}`}
                onClick={() => {
                  setForm((prev) => ({ ...prev, point }));
                }}
              >
                +{point}
              </button>
            ))}
      </div>
    </>
  );
}

export function RecipientsDropdown({ form, setForm }) {
  const users = useQuery("users", () => api.users.profiles(), {
    initialData: [],
  });
  const me = useQuery("me", () => api.auth.me(Cookies.get("user_id")));

  const usersWithoutMe = users.isLoading
    ? []
    : users.data.filter((x) => x.id !== me.data.id);

  const [searchUserQuery, setSearchUserQuery] = React.useState("");
  let searchedUser = usersWithoutMe.filter((user) =>
    JSON.stringify(user).toLocaleLowerCase().includes(searchUserQuery)
  );

  const USER_BTN_HEIGHT = 28;
  const isSelected = (user) => form.recipients.includes(user.id);

  return (
    <>
      {/* dropdown trigger */}
      <p className="flex cursor-pointer gap-[2px] hover:font-bold">
        @ <span className="font-Lato">Recipients</span>
      </p>

      {/* container */}
      <div className="absolute z-10 hidden divide-y overflow-hidden rounded bg-white text-black shadow shadow-gray-400 group-hover:block">
        {/* fixed height list */}
        <div
          style={{ height: 5 * USER_BTN_HEIGHT }}
          className="overflow-y-auto"
        >
          {users.isLoading ? (
            <p className="absolute inset-0 m-auto h-10 w-[15ch] text-center text-gray-500">
              Loading...
            </p>
          ) : (
            <>
              {searchedUser.map((user) => {
                return (
                  <button
                    key={user.id}
                    style={{ height: USER_BTN_HEIGHT }}
                    className={`block w-full  px-4 py-1 text-left ${
                      isSelected(user)
                        ? "border-b border-primary/80 bg-primary/30"
                        : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setForm((prev) => {
                        if (isSelected(user)) {
                          prev.recipients = prev.recipients.filter(
                            (id) => id !== user.id
                          );
                        } else {
                          prev.recipients.push(user.id);
                        }

                        return { ...prev };
                      });
                    }}
                  >
                    {user.first_name} {user.last_name}
                  </button>
                );
              })}
            </>
          )}
        </div>

        <input
          className="bg-translucent px-2 py-1"
          onChange={(e) => setSearchUserQuery(e.target.value)}
          placeholder="Search @Recipient"
          value={searchUserQuery}
        />
      </div>
    </>
  );
}

export function HashTagsDropdown({ form, setForm }) {
  const properties = useQuery("properties", () => api.properties());

  const hashtags = properties.data?.hashtage;

  return (
    <>
      <p className="flex cursor-pointer gap-[2px] hover:font-bold">
        # <span className="font-Lato"> Hashtag</span>
      </p>
      <div className="absolute z-10 hidden flex-col divide-y overflow-hidden rounded bg-white text-black shadow group-hover:flex">
        {properties.isLoading ? (
          <p className="h-10 w-[15ch] pt-3 text-center">Loading</p>
        ) : (
          hashtags.map((tag) => {
            const checked = form.hashtags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`px-4 py-1 text-left ${
                  checked ? "bg-translucent" : ""
                }`}
                onClick={() => {
                  setForm((prev) => {
                    const checked = prev.hashtags.includes(tag);
                    if (checked) {
                      prev.hashtags = prev.hashtags.filter((x) => x !== tag);
                    } else {
                      prev.hashtags.push(tag);
                    }

                    return { ...prev };
                  });
                }}
              >
                {tag}
              </button>
            );
          })
        )}
      </div>
    </>
  );
}

export function toFormData(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    let _value = value;
    if (key === "recipients") {
      value.forEach((userId) => formData.append(key, userId));
    }
    // stringify only if value is array, object but not image File
    else if (
      typeof value == "object" &&
      !(value instanceof File || value instanceof Blob)
    ) {
      _value = JSON.stringify(value);
      formData.set(key, _value);
    } else {
      formData.set(key, value);
    }
  });
  return formData;
}
