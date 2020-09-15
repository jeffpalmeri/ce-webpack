import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './quiz-1.scss';

const Quiz1 = (props) => {
  const { name } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="main-quiz-1">
      <h1>{name}</h1>
      <p className={show ? 'show' : 'load'}>quiz loaded</p>
    </div>
  );
};

Quiz1.propTypes = {
  name: PropTypes.string,
};

export default Quiz1;
