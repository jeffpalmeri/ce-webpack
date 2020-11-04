import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';

import './quiz-2.scss';

const Quiz1 = (props) => {
  const { name, description } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="main-quiz-2">
      <h1>{name}</h1>
      <p className={show ? 'show' : 'load'}>{description || 'quiz loaded'}</p>
    </div>
  );
};

Quiz1.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

export default hot(Quiz1);
