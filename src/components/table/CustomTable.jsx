import propTypes from 'prop-types'


const CustomTable = ({ data, tableHeadings, dataKeys }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full md:max-w-5xl sm:max-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeadings?.map((heading, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {dataKeys.map((key, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CustomTable.propTypes = {
  data: propTypes.array.isRequired,
  tableHeadings: propTypes.array.isRequired,
  dataKeys: propTypes.array.isRequired
}

export default CustomTable;
