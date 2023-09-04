import getAllDouments from '@/firebase/getData';
import React, { useEffect, useState } from 'react';
import { BsFillFileEarmarkPdfFill,BsImageFill } from 'react-icons/bs'
import { PiVideoFill } from 'react-icons/pi'

const Dashboard = () => {
  const [text,setText]=useState(0)
  const [file,setFile]=useState(0)
  const [image,setImage]=useState(0)
  const [video,setVideo]=useState(0)

  const getAllInfo=async()=>{
    const file = await getAllDouments("file")
    const text = await getAllDouments("text")
    const image = await getAllDouments("image")
    const video = await getAllDouments("video")
    console.log(file)
    setText(text.result?.docs.length)
    setFile(file.result?.docs.length)
    setImage(image.result?.docs.length)
    setVideo(video.result?.docs.length)
  }

  useEffect(()=>{
    getAllInfo()
  },[])
    return (
        <>
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
          </div>
          
        </div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
              <PiVideoFill size={25} />
            </div>
            <div>
              <span className="block text-2xl font-bold">{video}</span>
              <span className="block text-gray-500">Videos</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">{text}</span>
              <span className="block text-gray-500">Texts Notice</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
              <BsFillFileEarmarkPdfFill size={25} />
            </div>
            <div>
              <span className="block text-2xl font-bold">{file}</span>
              <span className="block text-gray-500">Files</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <BsImageFill size={25} />
            </div>
            <div>
              <span className="block text-2xl font-bold">{image}</span>
              <span className="block text-gray-500">Images</span>
            </div>
          </div>
        </section>
        
       
      </main>
      
        </>
    );
};

export default Dashboard;