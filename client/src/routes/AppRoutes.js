import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dictionary from '../components/dictionary';
import WordsUploadBox from '../components/dictionary/words-upload-box';
import WordsTrainer from '../components/words-trainer/WordsTrainer';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dictionary" exact component={Dictionary} />
        <Route path="/import" exact component={WordsUploadBox} />
        <Route path="/trainer" exact component={WordsTrainer} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
