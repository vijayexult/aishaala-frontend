import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

import { ClipLoader } from 'react-spinners';

import "./StorageMainContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes, faGreaterThan } from "@fortawesome/free-solid-svg-icons";

import SidebarDataset from "../SidebarDataset/sidebardataset";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
/*
// Set the workerSrc for PDF.js
import { pdfjs as PdfJsLib } from 'react-pdf';
import 'pdfjs-dist/webpack';

PdfJsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PdfJsLib.version}/pdf.worker.min.js`;


*/

//icon sidebar

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function StorageMainContent({ isDarkMode }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [uploadmessage, setUploadMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState("");


  const [category, setCategory] = useState('')
  //loading states
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deletingFile, setDeletingFile] = useState({});
  /*const [embedingLoading,setEmbedingLoading] = useState(false)*/
  const [embeddingLoading, setEmbeddingLoading] = useState({});

  console.log(allFiles)

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      setLoadingFiles(true);
      const result = await axios.get(`https://legai.onrender.com/get-files?term=${searchTerm}`);
      setAllFiles(result.data.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoadingFiles(false)
      alert("failed to fetch")
    } finally {
      setLoadingFiles(false);
    }
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    formData.append("uploadDate", formattedDate);
    formData.append("time", formattedTime);
    formData.append('category', category)
    setUploadingFile(true);





    try {
      const result = await axios.post("https://legai.onrender.com/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        setTitle("");
        setFile("");
        getFiles();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadingFile(false)
      alert("failed to upload")
    } finally {
      setUploadingFile(false);

    }

    document.getElementById("titleinput").value = "";
    document.getElementById("fileinputEle").value = "";
  };

  const showFile = (file) => {
    setFileUrl(`https://legai.onrender.com/files/${file}`);
  };


  const onchangeSearch = (e) => {
    setSearchTerm(e.target.value)

    if (document.getElementById('searchElement').value === "") {

      getFiles()
      setSearchTerm("")
    }

  }


  const handleKeyPress = (e) => {

    if (e.key === 'Enter') {
      getFiles()
    }
  }

  const searchFile = async () => {
    try {
      setLoadingFiles(true);
      const result = await axios.get(`https://legai.onrender.com/api/search-files?term=${searchTerm}`);
      if (result.data.status === 'ok') {
        setAllFiles(result.data.data);
      }
    } catch (error) {
      console.error('Error searching files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };


  const deleteFile = async (id) => {
    try {

      const updatedEmbeddingLoading = { ...deletingFile, [id]: true };
      setDeletingFile(updatedEmbeddingLoading);
      const result = await axios.delete(`https://legai.onrender.com/delete-file/${id}`);
      console.log(result)
      console.log(id)
      if (result.data.status === "ok") {
        alert("Deleted Successfully!!!");
        getFiles();
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
    } finally {

      setEmbeddingLoading({ ...deletingFile, [id]: false });
    }


  };

  const openFileViewer = (file) => {
    setSelectedFile(file);
    setNumPages(null)
  };



  // Function to close file viewer popup
  const closeFileViewer = () => {
    setSelectedFile(null);
    setNumPages(null)
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const EmbedCalled = async (data) => {
    console.log('embed clicked');
    const updatedEmbeddingLoading = { ...embeddingLoading, [data._id]: true };
    setEmbeddingLoading(updatedEmbeddingLoading);
    try {
      const formData = new FormData();
      formData.append('file', data.pdf);

      console.log('FormData content:', formData.get('file')); // Log the FormData content

      const response = await axios.post('https://legai.onrender.com/embed-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      alert(response.data)


      console.log(response.data);
      getFiles()
    } catch (error) {
      console.error('Error embedding file:', error);
    } finally {
      setEmbeddingLoading({ ...embeddingLoading, [data._id]: false });
    }
  };

  const EmbededFunctioncall = (data) => {
    if (data.status === "True") {
      alert('Embeded already')

    }
    else {
      getFiles()
      setUploadMessage("embeded")
      alert('Embedding is Successful!!')

    }

  }

  const renderFilePreview = (file) => {


    if (file.filetype.startsWith('image/')) {
      return <img src={`https://legai.onrender.com/files/${file._id}`} alt="File Preview" style={{ width: '100%' }} />;
    } else if (file.filetype.startsWith('video/')) {
      return <video controls src={`https://legai.onrender.com/files/${file._id}`} style={{ width: '100%' }} />;
    } else if (file.filetype.startsWith('audio/')) {
      return <audio controls src={`https://legai.onrender.com/${file._id}`} style={{ width: '100%' }} />;
    } else if (file.filetype === 'application/pdf') {
      return <iframe src={`https://legai.onrender.com/${file._id}`} style={{ width: '100%', height: '50vh' }} />;
    } else if (file.filetype.startsWith('text/')) {
      return <iframe src={`https://legai.onrender.com/${file._id}`} style={{ width: '100%', height: '600px' }} />;
    } else {
      return <p>File type not supported for preview.</p>;
    }
  };
  /*
  
    const renderFilePreview = (file) => {
      console.log(file)
      if (file.filetype === "application/pdf") {
        return (
          <Document file={`http://localhost:5000/files/${file.pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        );
      } else if (file.filetype.startsWith("image/")) {
        return <img src={`http://localhost:5000/files/${file.pdf}`} alt={file.title} style={{ maxWidth: "100%" }} />;
      } else if (file.filetype.startsWith("video/")) {
        return <video controls style={{ maxWidth: "100%" }}><source src={`http://localhost:5000/files/${file.pdf}`} type={file.filetype} /></video>;
      } else {
        return <p>Unsupported file type for preview</p>;
      }
    };*/

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


  return (
    <div className="mainDatasetContainer">
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: '#252525',
            color: '#ffffff',
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className="drawerHeader">
          <IconButton onClick={toggleDrawer(false)} className="drawerCloseButton">
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>
        <List className="deager">
          <SidebarDataset />
        </List>
      </Drawer>


      <div className="sidebarmobile">
        <SidebarDataset />
      </div>

      <div className={`  storage-main-content storageDatasetmobile ${isDarkMode ? "dark-mode" : "light-mode"}`}>

        <div className="header">
          <div className="uploadButtonCont">
            <div className="arrowcont">
              <IconButton className="sidebaropenbutton" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <FontAwesomeIcon className="drawericon" icon={faGreaterThan} />
              </IconButton>
              <h3 className="storagenamehead">Knowledge Base</h3>
            </div>

            <Popup className="popupclass" trigger={<button id="uploadbtn" className="storagebtn">Upload</button>} modal>
              {close => (
                <div id="modalStorage" className="modalstorage modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">Upload File</div>
                  <div className="contentstorage">
                    <form className="formStyle" onSubmit={submitFile}>
                      <input onChange={(e) => setCategory(e.target.value)} id="categoryinput" type="text" className="fileinput form-control" placeholder="Category" required />
                      <input
                        id="titleinput"
                        type="text"
                        className="form-control fileinput"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <br />
                      <input
                        id="fileinputEle"
                        type="file"
                        className="form-control fileinput"
                        accept="*/*"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <br />
                      <button className="btnCLassSubmitupload" type="submit">
                        {uploadingFile ? <ClipLoader size={16} color="#ffffff" /> : 'Submit'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>

        <div className="searchrow">
          <div className="searchCon">
            <FontAwesomeIcon className="searchicon" icon={faMagnifyingGlass} />
            <input className="searchEle"
              type="search"
              id="searchElement"
              onKeyPress={(e) => handleKeyPress(e)}
              placeholder="Search files..."
              value={searchTerm}
              onChange={onchangeSearch} />
          </div>
        </div>

        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Name</th>
                <th>Uploaded Date</th>
                <th>Filesize</th>
                <th>View</th>
                <th>Embedding</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {allFiles == null ? (
                <tr className="trnofiles">
                  <td colSpan="8" className="empty-message">You don't have any files yet :(</td>
                </tr>
              ) : (
                allFiles.map((data) => {
                  return (
                    <tr key={data._id}>

                      <td>{data.filetype}</td>
                      <td>{data.Category}</td>
                      <td>{data.title}</td>

                      <td>{data.uploadDate}</td>
                      <td>{data.filesize} bytes</td>
                      <td>
                        <button className="showAndDeleteBtn" onClick={() => openFileViewer(data)}>
                          Show File
                        </button>
                      </td>
                      <td>
                        {data.status === "True" ? (
                          <button className="showAndDeleteBtn EmbededButton" onClick={() => EmbededFunctioncall(data)}>Embedded</button>
                        ) :
                          <button key={data._id} className="showAndDeleteBtn" onClick={() => EmbedCalled(data)}>
                            {embeddingLoading[data._id] ? <ClipLoader size={16} color="#ffffff" /> : 'Embed'}
                          </button>}

                      </td>
                      <td>
                        <button className="showAndDeleteBtn" onClick={() => deleteFile(data._id)}>
                          {deletingFile[data._id] ? <ClipLoader size={16} color="#ffffff" /> : 'Delete'}

                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* File Viewer Popup */}
        {selectedFile && (
          <Popup open={true} closeOnDocumentClick onClose={closeFileViewer}>
            {close => (
              <div className="modal modal-viewFileCont">
                <button className="close" onClick={close}>
                  &times;
                </button>


                <div className="file-viewer">
                  <h2>{selectedFile.title}</h2>
                  {renderFilePreview(selectedFile)}
                </div>
              </div>
            )}
          </Popup>
        )}

        {/* Loading indicators */}
        {(loadingFiles) && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            {/* Optional: Loading message */}
            <p>Loading...</p>
          </div>
        )}


      </div>
    </div>
  );
}

export default StorageMainContent;
