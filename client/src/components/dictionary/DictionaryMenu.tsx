import React from 'react';
import css from './scss/dictionaryMenu.module.scss';
import { FaTrash, FaDumbbell, FaPlus } from 'react-icons/fa';

const buttonStyles = {
  padding: '0.5em 1em',
  fontWeight: '500',
  color: 'slategray',
  borderRadius: '4px'
};

type Props = {
  selectedWords: number[];
  allWordsQuantity?: number;
  clearSelectedWords(): void;
  exerciseSelectedWords(): void;
};

const DictionaryMenu: React.FC<Props> = ({
  selectedWords = [],
  allWordsQuantity = 0,
  clearSelectedWords = () => {},
  exerciseSelectedWords = () => {}
}) => {
  const selectedWordQuantity = selectedWords.length;

  return (
    <div className={css.wrapper}>
      <div className={css.row}>
        <div className={css.text}>
          <strong>{selectedWordQuantity}</strong> Selected item
          {`${selectedWordQuantity > 1 ? 's' : ''}`}
        </div>

        <div className={css.actions}>
          <button disabled={!selectedWordQuantity}>
            <FaDumbbell />
          </button>
          <button disabled={!selectedWordQuantity}>
            <FaTrash />
          </button>
        </div>

        <div className={css.add}>
          <button className={css.addBtn}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryMenu;
