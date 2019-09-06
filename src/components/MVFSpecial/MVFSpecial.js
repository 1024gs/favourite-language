import React, {useState} from 'react';
import Loading from '../Loading/Loading';
import {getAll as getAllRepos} from '../../services/github-repos';
import _ from '../../utils/_';

// guessFavourite(repos) -> JavaScript
const guessFavourite = _.pipe(_.map(_.prop('language')), _.mostCommon);

const Result = (language) => {
  if (_.isNil(language)) {
    return <h4>Is hard to tell</h4>;
  }
  if (language) {
    return <h4>Your favorite language could be {language}</h4>;
  }
  return null;
};

const MVFSpecial = () => {
  let username = '';
  let [language, setLanguage] = useState('');
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setLanguage('');
    setError(null);
  };
  const onError = (err) => {
    setError(err);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || isLoading) {
      return;
    }

    reset();

    setIsLoading(true);
    getAllRepos(username)
      .then((x) => {
        if (_.isEmpty(x)) {
          /* eslint-disable-next-line no-throw-literal */
          throw {message: 'No repositories'};
        }
        return x;
      })
      .then(_.pipe(guessFavourite, setLanguage))
      .catch(onError)
      .finally(() => setIsLoading(false));
  };

  const onChange = (e) => {
    username = e.target.value;
  };

  return (
    <div className="MVFSpecial">
      <h1>I am a special component</h1>
      <p>I can guess what is your favorite programing language</p>

      <form onSubmit={onSubmit}>
        <label>
          <input
            placeholder="Github username"
            type="text"
            onChange={onChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {Result(language)}
      <Loading isLoading={isLoading} />
      {error && <h4 className="MVFSpecial-error">{error.message}</h4>}
    </div>
  );
};

export default MVFSpecial;
