import Table from 'rc-table';
import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import { HiDocumentText } from 'react-icons/hi'
import { BsFillFileEarmarkPdfFill,BsImageFill } from 'react-icons/bs'
import getAllDouments from '@/firebase/getData';
import Link from 'next/link';

const SubCategoryTable = () => {


  const [fileData, setfileData] = useState([])
  const [textData,setTextData]=useState([])
  const [imageData,setImageData]=useState([])

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

  const getAllText = async () => {
    const { result, error } = await getAllDouments("text")
    let data = []
    if (result) {

      result.forEach((doc) => {
        let { title, date, text } = doc.data()
        data.push({ title, text, date: new Date(date).toLocaleDateString() })
      });

      setTextData(data)

    }
    else {
      alert(error)
    }
  }

  const getAllImage = async () => {
    const { result, error } = await getAllDouments("image")
    let data = []
    if (result) {

      result.forEach((doc) => {
        let { title, date, image } = doc.data()
        data.push({ title, image, date: new Date(date).toLocaleDateString() })
      });

      setImageData(data)

    }
    else {
      alert(error)
    }
  }

  useEffect(() => {
    getAllfile()
    getAllText()
    getAllImage()
  }, [])

  console.log(textData)
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
              <div className="font-semibold text-left">File</div>
            </th>
            

          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-gray-100">
          {fileData.map((data, index) => (
            <tr>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="font-medium text-gray-800">{data.title}</div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left">{data.date}</div>
              </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500"><Link href={data.file}><BsFillFileEarmarkPdfFill size={25} /></Link></div>
                </td>
              

            </tr>
          ))}

        </tbody>
      </table>
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
              <div className="font-semibold text-left">Text</div>
            </th>
            

          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-gray-100">
          {textData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="font-medium text-gray-800">{data.title}</div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left">{data.date}</div>
              </td>
                <td className="p-2 w-[50%]">
                  <div className="text-left font-medium text-green-500">{data.text}</div>
                </td>
              

            </tr>
          ))}

        </tbody>
      </table>
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
              <div className="font-semibold text-left">Image</div>
            </th>
            

          </tr>
        </thead>
        <tbody className="text-xl divide-y divide-gray-100">
          {imageData.map((data, index) => (
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
                  <div className="text-left font-medium text-green-500"><Link href={data.image}><BsImageFill size={25} /></Link></div>
                </td>
              

            </tr>
          ))}

        </tbody>
      </table>
    </>

  );
};

export default SubCategoryTable;