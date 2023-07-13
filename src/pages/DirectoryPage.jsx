import * as React from "react";
import { BsSearch } from "react-icons/bs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import PersonCard from "../components/Directory/PersonCard";
import UserImage from "../assets/images/user-profile/pp.png";
import { useQuery, useQueryClient } from "react-query";
import { api } from "@/api";

let inputDelayRef = { current: 0 };
const handleChange = (setQuery) => (ev) => {
  clearTimeout(inputDelayRef.current);

  const value = ev.target.value;
  inputDelayRef.current = setTimeout(() => {
    setQuery(value);
  }, 500);
};

/**
 * get department from profiles api
 */
const getDepartment = (profiles) => Array.from(new Set(profiles.map(user => user.department)));

/**
 * get department from profiles api
 */
const getLocation = (profiles) => Array.from(new Set(profiles.map(user => user.location)));

export default function DirectoryPage({ ...props }) {
  const profiles = useQuery("users", () => api.users.profiles(), {
    initialData: [],
  });
  const [query, setQuery] = React.useState("");
  const [departmentFilter, setDepartmentFilter] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const users = useQuery({
    queryKey: ["users", page, locationFilter, departmentFilter, query],
    queryFn: () =>
      api.users.search({
        user: query,
        location: locationFilter,
        department: departmentFilter,
        page,
      }),
  });

  const filteredUsers = users.data?.results;
  const department = profiles.data ? getDepartment(profiles.data) : []
  const location = profiles.data ? getLocation(profiles.data) : []

  return (
    <div className="col-span-2 pl-3 pr-3 xs:pt-0 sm:pt-3 lg:pl-0">
      <div className="rounded-lg bg-white px-5 py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <BsSearch />
            <input
              className="ml-1.5 flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              defaultValue={query}
              placeholder="Search"
              onChange={handleChange(setQuery)}
            />
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select
              className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              onChange={(ev) => setDepartmentFilter(ev.target.value)}
            >
              <option value="">Filter by Department</option>
              {department.map((depart) => (
                <option value={depart} key={depart}>
                  {depart}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select
              className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              value={locationFilter}
              onChange={(ev) => setLocationFilter(ev.target.value)}
            >
              <option value="">Filter by Location</option>
              {location.map((loc) => (
                <option value={loc} key={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {users.isLoading ? null : (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {filteredUsers.map((props) => (
                <PersonCard key={props.name} img={UserImage} {...props} />
              ))}
            </div>

            <div className="mx-auto mt-10 flex max-w-[14rem] items-center justify-between ">
              <div className="flex">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, --p))}
                  className="grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300"
                >
                  <SlArrowLeft className="text-xl" />
                </button>

                <button
                  disabled={users.data.next == null}
                  className="ml-3 grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300"
                  onClick={() => setPage((p) => ++p)}
                >
                  <SlArrowRight className="text-xl" />
                </button>
              </div>

              <span>
                Page {page} of {users.data.count}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
