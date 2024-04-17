
import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css'
import { useEffect, useState } from "react";
import { userStatus, users } from "../../api/adminApi";
import ConfirmationModals from "../modals/confirmationModals";
import { AddUBtn } from "./AddBtn";


const TABLE_HEAD = ["Name", "Email", "Phone", "Status"];


export function UserTable() {

  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);



  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)


  const [searchTerm, setSearchTerm] = useState('')

  const pageSize = 8;

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await users(currentPage)
      console.log('res for table--', res);
      setUsersData(res?.users);
      setTotalUsers(res?.totalUsers);
      setTotalPages(Math.ceil(res?.totalUsers / pageSize))
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }

  }

  //get the users when the page is loaded
  useEffect(() => {
    getUsers()
  }, [showModal, currentPage])


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatus = async () => {
    const result = await userStatus(editId)
    console.log('rrrr', result);
    setShowModal(false)
  }

  const modalConfirmation = (id) => {
    console.log(id)
    setShowModal(true)
    setEditId(id)
  }



  //take the search value
  const handleSearchUser = (event) => {
    setSearchTerm(event.target.value)

  }

  // filter the data according to search 
  const filteredusers = usersData.filter((usr) => {
    const name = `${usr.name}`.toLowerCase()
    const mob = `${usr.mob}`.toLowerCase()
    const searchTermL = searchTerm.toLowerCase()

    return (
      name.includes(searchTermL) || mob.includes(searchTermL)
    )
  })



  return (
    <>
      <div className="mt-5 p-5">


        <div className="flex items-center justify-center mb-5">
          <div className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>USERS</h1>
          </div>
        </div>

        {loading && <p>Loading...</p>}


        <AddUBtn handleSearchUser={handleSearchUser} searchTerm={searchTerm} />

        <div className="mt-5 p-5 ">
          <Card className="h-full w-full overflow-scroll shadow-lg ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className={styles.tableHead}>
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredusers.map(({ _id, name, email, mob, status }, index) => {
                  const isLast = index === usersData.length - 1;
                  const cellClass = isLast ? styles.tableCellLast : styles.tableCell;

                  return (
                    <tr key={name}>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {name}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {email}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {mob}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography as="a" href="#" variant="small" color="blue-gray" className={styles.editLink}>
                          {status ? (
                            <button className="bg-[#64c351] rounded-md  shadow-2xl p-3" onClick={() => modalConfirmation(_id)}>Block</button>
                          ) : (
                            <button className="bg-[#da3c3c] rounded-md shadow-2xl p-3" onClick={() => modalConfirmation(_id)}>Unblock</button>
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="flex gap-3 justify-center">
          <button className="text-xs px-4 py-2 border border-blue-gray-200 bg-blue-gray-100 rounded-md" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
          <div className=" flex flex-col items-center">
            <span className="text-xs" >Page {currentPage} of {totalPages}</span>
            <p className="text-xs">Total Users: {totalUsers}</p>
          </div>
          <button className="text-xs px-4 py-2  border border-blue-gray-200 bg-blue-gray-100 rounded-md" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>

      </div>
      {showModal && <ConfirmationModals handleStatus={handleStatus} setShowModal={setShowModal} />}
    </>
  );
}



