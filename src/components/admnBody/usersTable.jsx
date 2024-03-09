
import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css'
import { useEffect } from "react";
import { users } from "../../api/adminApi";


const TABLE_HEAD = ["Name", "Email", "Phone", "Status"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },

];

export function UserTable() {
  useEffect(()=>{
    const getUsers = async()=>{
      let res = await users()
    console.log('res for table--',res.data);
    }
    getUsers()
  },[])

  return (

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
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
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
                        {job}
                      </Typography>
                    </td>
                    <td className={cellClass}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={cellClass}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className={styles.editLink}>
                        Edit
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
  );
}
