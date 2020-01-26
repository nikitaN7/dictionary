import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dictionary from '../components/dictionary';
import WordsUploadBox from '../components/dictionary/words-upload-box';
import WordsTrainer from '../components/words-trainer/WordsTrainer';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Dictionary />
      </Route>
      <Route path="/upload">
        <WordsUploadBox />
      </Route>
      <Route path="/trainer">
        <WordsTrainer />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
