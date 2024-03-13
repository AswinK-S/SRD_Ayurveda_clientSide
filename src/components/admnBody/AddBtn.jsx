import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa'

export const AddBtn = ({ handleSearchChange, searchTerm }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4  px-20 ">


        <div className="">
          <button className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 ">
            <Link to="/admin/addDoc">Add Doctor</Link>
          </button>
        </div>

        <div className='shadow-lg flex items-center border border-lime-200 rounded' >
          <span className="px-3 text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name or mobile number or treatment"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-3 shadow-lg rounded"
          />
        </div>


      </div>
    </>

  );
};



export const AddTBtn = ({ handleSearch, searchTerm }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4  px-20 ">


        <div className="">
          <button className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 ">
            <Link to="/admin/addTreat">Add Treatment</Link>
          </button>
        </div>

        <div className='shadow-lg flex items-center border border-lime-200 rounded' >
          <span className="px-3 text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search "
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-3 shadow-lg rounded"
          />
        </div>


      </div>
    </>
  )
}


AddBtn.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

AddTBtn.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
}