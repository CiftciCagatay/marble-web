import React from 'react'
import Dropzone from 'react-dropzone'

const FileDropzone = props => {
  const {
    children,
    disableClick,
    
    onDrop,
    setDropzoneRef,
    onDragEnter,
    onDragLeave
  } = props

  return (
    <Dropzone
      multiple={true}
      className="news-dropzone"
      activeClassName="news-dropzone-active"
      rejectClassName="news-dropzone-reject"
      id="filedrops"
      onDrop={onDrop}
      disableClick={disableClick}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      ref={node => setDropzoneRef(node)}
    >
      {children}
    </Dropzone>
  )
}

export default FileDropzone
