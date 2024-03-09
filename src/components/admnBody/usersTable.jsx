
import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css'
import { useEffect, useState } from "react";
import { userStatus, users } from "../../api/adminApi";
import ConfirmationModals from "../modals/confirmationModals";


const TABLE_HEAD = ["Name", "Email", "Phone", "Status"];



export function UserTable() {

  const [user, setUser] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [editId,setEditId]=useState(null)

  //get the users when the page is loaded
  useEffect(() => {
    const getUsers = async () => {
      let res = await users()
      console.log('res for table--', res.data);
      setUser(res.data)
    }
    getUsers()
  }, [showModal])

  const handleStatus = async () => {
    // console.log('usrSts id', id);
    let result = await userStatus(editId)
    console.log('rrrr', result);
    setShowModal(false)
  }

  const modalConfirmation =(id)=>{
    console.log(id)
    setShowModal(true)
    setEditId(id)
  }


  return (
    <>
      <div className="bg-[#cd6c79] mt-5 p-5">


        <div className="flex items-center justify-center mb-5 bg-black">
          <div className="bg-[#E7EE9D] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>USERS</h1>
          </div>
        </div>

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
                {user.map(({ _id, name, email, mob, status }, index) => {
                  const isLast = index === user.length - 1;
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
                            <button className="bg-green-800 p-2" onClick={() => modalConfirmation(_id)}>Block</button>
                          ) : (
                            <button className="bg-red-800 p-2" onClick={() => modalConfirmation(_id)}>Unblock</button>
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



      </div>
      {showModal && <ConfirmationModals  handleStatus={handleStatus} setShowModal={setShowModal}/>}
    </>
  );
}
