/* eslint-disable @next/next/no-img-element */
import addData from "@/firebase/addData";
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { v4 } from 'uuid';
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Modal = ({ modal, setModal, type }) => {
  const [title, setTitle] = useState("")
  const [video, setVideo] = useState("")
  const [file, setFile] = useState('')
  const [percent, setPercent] = useState(0)
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const handleUpload = (event) => {
    let file = event.target.files[0];
    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => alert(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(url);
        });
      }
    );

  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (type === 'video') {
      await addData("video", v4(), { title, video, date: Date.now() })
    }
    else {
      await addData("file", v4(), { title, file, date: Date.now() })
    }
    setModal(false)
    window.location.reload()
  }

  useEffect(() => {
    if (!modal) {
      setSelectedImage();
    }
  }, [modal])
  //console.log('modal modal', modal)
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}

      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Create {type === "video" ? 'Video' : "Notice"}</p>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Title</label>
            <input className="border-2 border-purple-600/50 w-[75%] " type="text" onChange={e => setTitle(e.target.value)} />
          </div>
          {type === 'video' ? <div className="flex justify-between">
            <label className="font-semibold pr-2">Video Link</label>
            <input className="border-2 border-purple-600/50 w-[75%] " type="text" onChange={e => setVideo(e.target.value)} />
          </div> :
            <div className="flex-row justify-between">
              <label className="font-semibold pr-2">Upload file (PDF,TXT)</label>
              <input
                className="border-2"
                type="file"
                accept="application/*"
                name="user[image]"
                multiple={true}
                onChange={handleUpload}
              />
              <div className="flex overflow-auto my-2 p-2">
                {
                  selectedImage && [...selectedImage].map((file, index) => <img key={index} src={URL.createObjectURL(file)} className="w-32 h-32 mr-1 rounded-sm border-4" />)
                }

              </div>

              {selectedImage &&
                <button onClick={removeSelectedImage} className='bg-orange-400 p-2 rounded-md text-white'>
                  Remove This Image
                </button>
              }

              {percent>0&&<p>Please Wait... {percent}%</p>}

            </div>
          }

          <div className="flex justify-between">

            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </PureModal>
      ;
    </>
  );
};

export default Modal;
