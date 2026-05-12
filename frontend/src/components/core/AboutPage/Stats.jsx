import React from "react";

const datas= [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const Stats = () => {
  return (
    <div className="bg-primary-700">
      <div className="mx-auto flex w-10/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <div className="grid grid-cols-2 text-center md:grid-cols-4">
          {datas.map((data, index) => {
            return (
              <div className="flex flex-col gap-2 py-10" key={index}>
                <h1 className="text-3xl font-bold text-white">
                  {data.count}
                </h1>
                <h2 className="text-[16px] font-semibold text-gray-300">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;