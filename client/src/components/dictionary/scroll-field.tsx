import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

type Props = {
  handleTableScroll(value: string): void;
  tableScrollIdx: number | null;
};

const ScrollField: React.FC<Props> = ({
  handleTableScroll,
  tableScrollIdx
}) => {
  return (
    <div className="search">
      <div className="search__group search__group--sm">
        <input
          name="filterSearch"
          type="text"
          placeholder="Scroll to"
          onChange={e => handleTableScroll(e.target.value)}
          value={tableScrollIdx || ''}
        />
        <button className="search__btn">
          <FaAngleDoubleDown />
        </button>
      </div>
    </div>
  );
};

export default ScrollField;
