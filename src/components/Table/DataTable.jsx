import React from 'react'

const DataTable = ({ data }) => {
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>   {Object?.keys(data[0])?.map((header, index) => (
            <th key={index} className="py-3 px-4 lg:py-4 lg:px-6">
              {header}
            </th>
          ))} </tr>
        </thead>
      </table>
    </div>
  )
}

export default DataTable