import React from 'react';

type Props = {
  onActionClick(id: number | null, action: string): void;
};

const DictionaryHeader: React.FC<Props> = ({ onActionClick }) => {
  return (
    <div className="dictionary__header">
      <button
        type="button"
        className="btn btn--lg btn--add"
        onClick={() => onActionClick(null, 'add')}
      >
        Add New
      </button>
    </div>
  );
};

export default DictionaryHeader;
