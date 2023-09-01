import Table from 'rc-table';
import React, { useState,useEffect } from 'react';
import Pagination from "react-js-pagination";
import { HiDocumentText } from 'react-icons/hi'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'
import getAllDouments from '@/firebase/getData';
import Link from 'next/link';

const SubCategoryTable = () => {


  const [fileData, setfileData] = useState([])

  const getAllfile = async () => {
    const { result, error } = await getAllDouments("file")
    let data = []
    if (result) {

      result.forEach((doc) => {
        let { title, date, file } = doc.data()
        data.push({ title, file, date: new Date(date).toLocaleDateString() })
      });

      setfileData(data)

    }
    else {
      alert(error)
    }
  }

  useEffect(() => {
    getAllfile()
  }, [])
  return (
    <>
      <table class="table-auto w-full">
        <thead class="text-xl text-center font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Title</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Date</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">File</div>
            </th>

          </tr>
        </thead>
        <tbody class="text-xl divide-y divide-gray-100">
          {fileData.map((data, index) => (
            <tr>
              <td class="p-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="font-medium text-gray-800">{data.title}</div>
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left">{data.date}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left font-medium text-green-500"><Link href={data.file}><BsFillFileEarmarkPdfFill size={25} /></Link></div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </>

  );
};

export default SubCategoryTable;