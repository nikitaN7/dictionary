import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dictionary from '../components/dictionary/Dictionary.tsx';
import WordsUploadBox from '../components/dictionary/words-upload-box';
import WordsTrainer from '../components/words-trainer/WordsTrainer.tsx';
import Layout from '../components/layout/Layout';

const NotFoundPage = () => <div>not found</div>;

const AppRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dictionary" exact component={Dictionary} />
        <Route path="/import" exact component={WordsUploadBox} />
        <Route path="/trainer" exact component={WordsTrainer} />

        <Route path="/" exact render={() => <Redirect to="/dictionary" />} />
        <Route path="*" exact={true} component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
