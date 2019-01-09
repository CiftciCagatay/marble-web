import React from 'react'
import Dropzone from 'react-dropzone'

const FileDropzone = props => {
  const {
    children,

    setDropzoneRef,
    ...rest
  } = props

  return (
    <Dropzone
      multiple={true}
      className="news-dropzone"
      activeClassName="news-dropzone-active"
      rejectClassName="news-dropzone-reject"
      id="filedrops"
      ref={node => setDropzoneRef(node)}
      {...rest}
    >
      {children}
    </Dropzone>
  )
}

export default FileDropzone
