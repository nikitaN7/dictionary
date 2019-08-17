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
      if (!props.error) {
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

      {!props.error
        ? <BoxInput
            advUpload={advUpload}
            fileInput={props.fileInput}
            handleFile={props.handleFile}/>
        : null
      }

      <span className="box__uploading box__text">Uploading&hellip;</span>
      <span className="box__success box__text">Done!</span>

      {props.error
        ? <span className="box__error box__text">Error! {props.error}.
            <strong onClick={props.removeError}> Try again.</strong>
          </span>
        : null}
    </form>
  )
}

export default TargetBox;