import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  const chartPalette = [
    "rgba(42, 157, 143, 0.85)",
    "rgba(233, 196, 106, 0.85)",
    "rgba(244, 162, 97, 0.85)",
    "rgba(231, 111, 81, 0.85)",
    "rgba(120, 178, 171, 0.85)",
    "rgba(68, 199, 181, 0.85)",
  ]

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: courses.map((_, index) => chartPalette[index % chartPalette.length]),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: courses.map((_, index) => chartPalette[(index + 2) % chartPalette.length]),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
      <p className="text-lg font-bold text-white">Visualize</p>
      <div className="space-x-4 font-semibold">

        <button
          onClick={() => setCurrChart("students")}
            className={`rounded-full border px-3 py-1 transition-all duration-200 ${currChart === "students"
              ? "border-secondary-500 bg-secondary-500/10 text-secondary-500"
              : "border-gray-700 text-gray-300 hover:text-white"
            }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
            className={`rounded-full border px-3 py-1 transition-all duration-200 ${currChart === "income"
              ? "border-secondary-500 bg-secondary-500/10 text-secondary-500"
              : "border-gray-700 text-gray-300 hover:text-white"
            }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}