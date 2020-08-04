import React from 'react';
import css from './scss/dictionaryMenu.module.scss';
import { FaTrash, FaDumbbell, FaPlus } from 'react-icons/fa';
import { wordAdd } from '../../actions/word-list-update';

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
  deleteSelectedWords(): void;
  onActionClick(id: number | null, action: string): void;
};

const DictionaryMenu: React.FC<Props> = ({
  selectedWords = [],
  exerciseSelectedWords = () => {},
  deleteSelectedWords = () => {},
  onActionClick = () => {}
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
          <button
            disabled={!selectedWordQuantity}
            onClick={exerciseSelectedWords}
          >
            <FaDumbbell />
          </button>
          <button
            disabled={!selectedWordQuantity}
            onClick={deleteSelectedWords}
          >
            <FaTrash />
          </button>
        </div>

        <div className={css.add}>
          <button
            className={css.addBtn}
            onClick={() => onActionClick(null, 'add')}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryMenu;
