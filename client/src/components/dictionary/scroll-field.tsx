import React from 'react';
import { FaAngleDoubleDown, FaTimes } from 'react-icons/fa';

type Props = {
  handleTableScroll(value: string): void;
  tableScrollIdx: number | null;
};

const ScrollField: React.FC<Props> = ({
  handleTableScroll,
  tableScrollIdx
}) => {
  const handleClick = () => {
    if (tableScrollIdx) {
      handleTableScroll('');
    }
  };

  return (
    <div className="search">
      <div className="search__group search__group--sm">
        <input
          name="filterSearch"
          type="text"
          placeholder="№"
          onChange={e => handleTableScroll(e.target.value)}
          value={tableScrollIdx || ''}
        />
        <button className="search__btn" onClick={handleClick}>
          {!tableScrollIdx ? <FaAngleDoubleDown /> : <FaTimes />}
        </button>
      </div>
    </div>
  );
};

export default ScrollField;
