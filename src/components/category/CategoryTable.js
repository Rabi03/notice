import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { PiVideoFill } from 'react-icons/pi'
import getAllDouments from '@/firebase/getData';
import Link from 'next/link';


const CategoryTable = () => {
  const [videoData, setVideoData] = useState([])

  const getAllVideo = async () => {
    const { result, error } = await getAllDouments("video")
    let data = []
    if (result) {

      result.forEach((doc) => {
        let { title, date, video } = doc.data()
        data.push({ title, video, date: new Date(date).toLocaleDateString() })
      });

      setVideoData(data)

    }
    else {
      alert(error)
    }
  }

  useEffect(() => {
    getAllVideo()
  }, [])
  return (
    <>

      <table className="table-auto w-full">
        <thead className="text-xl text-center font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Title</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Date</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Video</div>
            </th>

          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-gray-100">
          {videoData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="font-medium text-gray-800">{data.title}</div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left">{data.date}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-green-500"><Link href={data.video}><PiVideoFill size={25} /></Link></div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </>

  );
};

export default CategoryTable;