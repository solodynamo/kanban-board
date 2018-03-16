import {
  BACKLOG,
  INPROGRESS,
  TESTINGLOG,
  DONE
} from '../constants/task_id.js';
import data from '../staticData.js';
let taskId;
let parentN;
export let getDataOfParticularTaskID = id =>
  JSON.parse(localStorage.getItem(id));

export let initDataIntoLocalStorage = () => {
  if (window.localStorage) {
    window.localStorage.setItem(BACKLOG, JSON.stringify(data.backlog));
    window.localStorage.setItem(INPROGRESS, JSON.stringify(data.inProgress));
    window.localStorage.setItem(TESTINGLOG, JSON.stringify(data.testingLog));
    window.localStorage.setItem(DONE, JSON.stringify(data.done));
  } else {
    console.warn('WARNING!! , CANT FIND LOCALSTORAGE');
  }
};

export let getRandomStr = () => {
  var length = 3;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
};

export let removeItemFromArray = (arr, id) => {
  arr = arr.filter(function (obj) {
    return obj.id !== id;
  });
  return arr;
};

export let addItemIntoArray = arr => {
  const obj = {
    id: getRandomStr(),
    firstName: 'First Name',
    lastName: 'Last Name',
    description: 'Pls add description',
    title: 'Pls add title'
  };
  let newArr = [];
  if (!arr) {
    newArr.push(obj);
    return newArr;
  } else {
    arr.unshift(obj);
    return arr;
  }
};

export let allowDrop = e => e && e.preventDefault();

export let dragStart = e => {
  taskId = e.target;
  parentN = e.target.parentNode;
  e.target.style.paddingTop = '10px';
};

export let dragoverHandler = e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export let drop = e => {
  let newArr = [];
  e.target.style.background = '';
  if (e.target.nodeName !== 'P') {
    let relocatedObj = {
      firstName: taskId.dataset.firstname,
      lastName: taskId.dataset.lastname,
      description: taskId.dataset.description,
      id : taskId.dataset.taskid,
      title: taskId.dataset.tasktitle
    };
    let oldTrackId = taskId.dataset.track;
    let oldData = getDataFromLocalStorage(oldTrackId);
    let updatedOldData = removeItemFromArray(oldData, taskId.dataset.taskid);
    persistDataToLocalStorage(oldTrackId, updatedOldData);
    parentN.removeChild(taskId);
    e.target.appendChild(taskId);
    let data = getDataFromLocalStorage(e.target.title);
    if(!data) {
      newArr.push(relocatedObj);
      persistDataToLocalStorage(e.target.title, newArr);
    } else {
      data.push(relocatedObj);
      persistDataToLocalStorage(e.target.title, data);
    }
  }
};

export let persistDataToLocalStorage = (key,data) => {
  localStorage.setItem(key,JSON.stringify(data));
};

export let saveUpdatedTaskInTrack = (key, task, modifiedDescription, modifiedTitle) => {
  let data = getDataFromLocalStorage(key);
  for(var i = 0; i < data.length; i++){
    if (data[i].id === task.id) {
      data[i].description = modifiedDescription === '' ? task.description : modifiedDescription;
      data[i].title = modifiedTitle === '' ? task.title : modifiedTitle;
      break;
    }
  }
  persistDataToLocalStorage(key, data);
};

export let getDataFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));