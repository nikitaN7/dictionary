import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import BoxInput from './box-input';
import { isAdvancedUpload } from '../../function/isAdvancedUpload';

const TargetBox = (props) => {

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      props.onDrop(monitor)
    },
    canDrop: () => {
      if (!props.error && !props.isLoading && !props.isSuccess) {
        return true;
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const advUpload = isAdvancedUpload ? 'has-advanced-upload' : '';
  const dragOver = isOver && canDrop ? 'is-dragover' : '';

  return (
    <form method="post" action="" encType="multipart/form-data"
          ref={drop} className={`box ${dragOver} ${advUpload}`} >

      { !props.error && !props.isLoading && !props.isSuccess
        ? <BoxInput
            advUpload={advUpload}
            fileInput={props.fileInput}
            handleFile={props.handleFile}/>
        : null }

      { props.isLoading ? <span className="box__uploading box__text">Uploading&hellip;</span> : null }

      { props.isSuccess
        ? <span className="box__success box__text">Done!
            <strong onClick={props.onResetForm}> Load more.</strong>
          </span>
        : null }

      { props.error
        ? <span className="box__error box__text">Error! {props.error}.
            <strong onClick={props.onResetForm}> Try again.</strong>
          </span>
        : null }
    </form>
  )
}

export default TargetBox;