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
              <div class="font-semibold text-left">Video</div>
            </th>

          </tr>
        </thead>
        <tbody class="text-xl divide-y divide-gray-100">
          {videoData.map((data, index) => (
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
                <div class="text-left font-medium text-green-500"><Link href={data.video}><PiVideoFill size={25} /></Link></div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </>

  );
};

export default CategoryTable;