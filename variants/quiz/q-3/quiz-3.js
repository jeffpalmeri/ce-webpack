import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './quiz-3.scss';

const Quiz1 = (props) => {
  const { name, description } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="main-quiz-3">
      <h1>{name}</h1>
      <p className={show ? 'show' : 'load'}>{description || 'quiz loaded'}</p>
    </div>
  );
};

Quiz1.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

export default Quiz1;
