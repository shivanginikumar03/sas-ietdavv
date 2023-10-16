import React from "react"
import { useSelector } from "react-redux"

function StripedTable() {
  const thClass =
    "px-3 py-4 text-left bg-blue-900 text-white text-xs font-medium sm:text-sm sm:px-4"
  const tdClass = "px-3 py-4 border-t border-b border-gray-300 text-xs sm:text-sm sm:px-4"
  const trClass = "border-gray-300 even:bg-gray-300"

  const subjects = useSelector(state=> state.subject.subjectData)

  return (
    <table className="w-full table-auto rounded-sm">
      <thead>
        <tr>
          <th className={thClass}>Subject Code</th>
          <th className={thClass}>Subject Name</th>
          <th className={thClass}>Faculty</th>
          <th className={thClass}>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {
          subjects.subjectDetails ?
            subjects.subjectDetails.map((value, index) => {
              return (
                <tr className={trClass} key={index}>
                  <td className={tdClass}>{value.subject_code}</td>
                  <td className={tdClass}>{value.subject_name}</td>
                  <td className={tdClass}>{value.name}</td>
                  <td className={tdClass}>{subjects.percentage[index]?Math.round(subjects.percentage[index]): 100}%</td>
                </tr>
              )
            })
            : null
        }
      </tbody>
    </table>
  )
}

export default StripedTable