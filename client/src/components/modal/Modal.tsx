import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModalInner from './modal-inner';
import { getWordById } from '../../utils/getWordById';
import {
  wordUpdate,
  wordDelete,
  wordAdd
} from '../../actions/word-list-update';

import { NewWord } from '../../types/wordsList';
import { RootState } from '../../reducers/index';

import { ConnectedProps } from 'react-redux';

interface InitialNewWord extends Omit<NewWord, 'id' | 'repetition'> {}

interface ComponentProps {
  modalClose(): void;
  wordAction: string;
  setTableScrollIdx(idx: number): void;
  isOpen: boolean;
  wordId: number | null;
}

const mapStateToProps = ({ wordList }: RootState, ownProps: ComponentProps) => {
  return {
    word: getWordById(wordList.words, ownProps.wordId),
    error: wordList.error,
    pending: wordList.pending
  };
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends ComponentProps, PropsFromRedux {}

const initialNewWord = {
  en: '',
  ru: '',
  bookmarks: false,
  transcription: '',
  association: '',
  enExample: '',
  ruExample: ''
};

const Modal: React.FC<Props> = props => {
  const [newWord, setNewWord] = useState<InitialNewWord>({ ...initialNewWord });

  const resetState = () => {
    const copy = { ...initialNewWord };
    setNewWord(copy);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setNewWord(prevState => {
      return {
        ...prevState,
        [target.name]: value
      };
    });
  };

  const onSubmit = (action: string) => {
    const {
      word,
      wordUpdate,
      wordAdd,
      wordDelete,
      modalClose,
      setTableScrollIdx
    } = props;

    if (action === 'update' && word) {
      wordUpdate(word, newWord, modalClose);
    }

    if (action === 'add') {
      wordAdd(newWord, modalClose, resetState, setTableScrollIdx);
    }

    if (action === 'delete' && word) {
      wordDelete(word, modalClose);
    }
  };

  useEffect(() => {
    const word = { ...newWord };

    resetState();

    if (props.word && Object.keys(props.word).length > 0) {
      Object.keys(word).forEach(key => {
        if (key === 'ruExample') {
          const value =
            (props?.word?.examples && props?.word.examples.ru) ||
            initialNewWord.ruExample;
          word.ruExample = value;
          return;
        }

        if (key === 'enExample') {
          const value =
            (props?.word?.examples && props?.word.examples.en) ||
            initialNewWord.enExample;
          word.enExample = value;
          return;
        }

        const wordsValueByKey = (props.word as { [key: string]: any })[
          key
        ] as any;
        const newWordsValueByKey = (initialNewWord as { [key: string]: any })[
          key
        ] as any;

        const value = wordsValueByKey || newWordsValueByKey;
        (word as { [key: string]: any })[key] = value;
      });

      setNewWord({ ...word });
    }
  }, [props?.word?.id]);

  return ReactDOM.createPortal(
    props.isOpen ? (
      <ModalInner
        {...props}
        onSubmit={onSubmit}
        newWord={newWord}
        handleChange={handleChange}
      />
    ) : null,
    document.querySelector('#modal-root') as HTMLElement
  );
};

const connector = connect(mapStateToProps, { wordAdd, wordDelete, wordUpdate });

export default connector(Modal);
