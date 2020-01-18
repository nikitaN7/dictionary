import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import BoxInput from './box-input';
import { isAdvancedUpload } from '../../utils/isAdvancedUpload';

const TargetBox = props => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      props.onDrop(monitor);
    },
    canDrop: () => {
      if (!props.error && !props.isLoading && !props.isSuccess) {
        return true;
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  const advUpload = isAdvancedUpload ? 'has-advanced-upload' : '';
  const dragOver = isOver && canDrop ? 'is-dragover' : '';
  const {
    error,
    isSuccess,
    fileInput,
    handleFile,
    onResetForm,
    isLoading
  } = props;

  return (
    <div className="box-wrapper">
      <form
        method="post"
        action=""
        encType="multipart/form-data"
        ref={drop}
        className={`box ${dragOver} ${advUpload}`}
      >
        {!error && !isLoading && !isSuccess ? (
          <BoxInput
            advUpload={advUpload}
            fileInput={fileInput}
            handleFile={handleFile}
          />
        ) : null}

        {isLoading ? (
          <span className="box__uploading box__text">Uploading&hellip;</span>
        ) : null}

        {isSuccess ? (
          <span className="box__success box__text">
            Done!
            <strong onClick={onResetForm} role="button" tabIndex={0}>
              {' '}
              Load more.
            </strong>
          </span>
        ) : null}

        {error ? (
          <span className="box__error box__text">
            Error! {error}.
            <strong onClick={onResetForm} role="button" tabIndex={0}>
              {' '}
              Try again.
            </strong>
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default TargetBox;
