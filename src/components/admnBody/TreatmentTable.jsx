import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css';
import { useEffect, useState } from "react";
import { treatments } from "../../api/adminApi";
import { AddTBtn } from "./AddBtn";

const TABLE_HEAD = ["Main Treatment Name", "Sub Treatments"];

const TreatmentTable = () => {
  const [treatmentData, setTreatmentData] = useState([]);

  // get the treatments when the page is loaded
  useEffect(() => {
    const getTreatments = async () => {
      try {
        const res = await treatments();
        console.log('treatment list for table --', res.data);
        setTreatmentData(res.data);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    getTreatments();
  }, []);

  return (
    <>
      <div className=" mt-5 p-5">
        <div className="flex items-center justify-center mb-5 ">
          <div className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>TREATMENTS</h1>
          </div>
        </div>

        {/* add treatment button */}
        <AddTBtn />

        <div className="mt-5 p-5 ">
          <Card className="h-full w-full overflow-scroll shadow-lg ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className={styles.tableHead}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {treatmentData.map(({ _id, name, subTreatments }, index) => {
                  const isLast = index === treatmentData.length - 1;
                  const cellClass = isLast
                    ? styles.tableCellLast
                    : styles.tableCell;

                  return (
                    <tr key={_id}>
                      <td className={cellClass}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography
                          as="div"
                          variant="small"
                          color="blue-gray"
                          className={styles.editLink}
                        >
                          <ul className="list-disc list-inside">
                            {subTreatments.map((subTreatment) => (
                              <li key={subTreatment._id}>
                                {subTreatment.name}
                              </li>
                            ))}
                          </ul>
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
    </>
  );
};

export default TreatmentTable;
