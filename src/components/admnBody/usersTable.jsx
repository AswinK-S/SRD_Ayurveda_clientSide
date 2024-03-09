 
import React from 'react';
import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css'


const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
 {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
 },
 {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
 },
 {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
 },
 {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
 },
 {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
 },
];

export function UserTable() {
 return (
    <Card className="h-full w-full overflow-scroll">
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
 );
}
