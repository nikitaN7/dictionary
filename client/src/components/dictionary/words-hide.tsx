import React, { useState, useEffect, useRef } from 'react';
import DropdownSelect from './dropdown-select';

const options = [
  { value: '', icon: 'show-eye', text: 'Show all words' },
  { value: 'en', icon: 'en-icon', text: 'Hide en words' },
  { value: 'ru', icon: 'ru-icon', text: 'Hide ru words' }
];

type Props = {
  hiddenWords: string;
  setHiddenWords(value: string): void;
};

const WordsHide: React.FC<Props> = ({ hiddenWords, setHiddenWords }) => {
  const [dropdownShow, setDropdownShow] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setDropdownShow(dropdownShow => !dropdownShow);
  }, [hiddenWords]);

  const renderDropdown = () => {
    return (
      <ul className="dictionary__dropdown">
        {options.map((item, idx) => {
          const isItemActive = hiddenWords === item.value ? 'active' : '';

          return (
            <li
              key={idx}
              onClick={() => setHiddenWords(item.value)}
              className={`dictionary__options__item white ${isItemActive}`}
            >
              <img src={`/img/${item.icon}.svg`} alt="" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const activeClass = dropdownShow ? 'is-open' : 'is-close';

  return (
    <div className="dictionary__options">
      <DropdownSelect
        onClick={() => setDropdownShow(dropdownShow => !dropdownShow)}
        activeClass={activeClass}
        bgColor="blue"
        icon="hide-eye.svg"
        text="Hide words"
      />

      {dropdownShow ? renderDropdown() : null}
    </div>
  );
};

export default WordsHide;