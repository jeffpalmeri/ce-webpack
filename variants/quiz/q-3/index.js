import React from 'react';
import loadable from '@loadable/component';

import ReactApp from '../../react/app';
import ReactLoader from '../../react/loader';

const Quiz1 = loadable(() => import('./quiz-3'));
const QuizWrap = () => <Quiz1 name="Quiz 'the' third" />;

ReactLoader(ReactApp(QuizWrap), 'quiz-3');
