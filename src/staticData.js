import { getRandomStr } from './utils/index';

const data = {
  backlog: [
    {
      id: getRandomStr(),
      title: 'lorem',
      firstName: 'ankit',
      lastName: 'singh',
      description: 'Need to catch a bug !!',
      track: 'backlog'
    }
  ],
  inProgress: [
    {
      id: getRandomStr(),
      title: 'lorem',
      firstName: 'ankit',
      lastName: 'singh',
      description: 'Need to catch a bug inProgress!!',
      track: 'inProgress'
    }
  ],
  testingLog: [
    {
      id: getRandomStr(),
      title: 'lorem',
      firstName: 'ankit',
      lastName: 'singh',
      description: 'Need to catch a bug In testing!!',
      track: 'testingLog'
    }
  ],
  done: [
    {
      id: getRandomStr(),
      title: 'lorem',
      firstName: 'ankit',
      lastName: 'singh',
      description: 'Need to catch a bug when its done!!',
      track: 'done'
    },
    {
      id: getRandomStr(),
      title: 'lorem',
      firstName: 'ankit',
      lastName: 'singh',
      description: 'Need to catch a bug when its done!!',
      track: 'done'
    }
  ]
};

export default data;
