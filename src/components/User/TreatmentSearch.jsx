import { FaSearch } from "react-icons/fa"
import propTypes from 'prop-types'

const TreatmentSearch = ({searchTerm,handleSearch})=>{
    return (
        <>
        <div className="flex items-center justify-between mb-4 px-20 ">
            <div className="flex items-center border border-lime-200 shadow-lg rounded">
                <span className="px-3 text-gray-500">
                    <FaSearch/>
                </span>
                <input 
                type="text"
                placeholder="search"
                className="px-4 py-3"
                onChange={handleSearch}
                />
            </div>
        </div>
        </>
    )
}

TreatmentSearch.propTypes={
    handleSearch:propTypes.func.isRequired,
    searchTerm:propTypes.string.isRequired
}

export default TreatmentSearch