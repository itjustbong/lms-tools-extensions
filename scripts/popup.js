import { getElements } from './util/dom.js';

// 학번 비번 저장 관련
const saveUserInfo = () => {
  const id = getElements('#soongFiID')[0].value;
  const pw = getElements('#soongFiPW')[0].value;
  if (!id || !pw) return alert('학번과 비밀번호를 확인해주세요');
  chrome.storage.sync.set({
    soongFiID: id,
    soongFiPW: pw,
  });
  alert('저장이 완료되었습니다.');
};

// 학번 비번이 저장되어 있다면,
chrome.storage.sync.get(['soongFiID', 'soongFiPW'], (data) => {
  getElements('#soongFiID')[0].value = data.soongFiID;
  getElements('#soongFiPW')[0].value = data.soongFiPW;
});

// 탭 관련
const tabChange = () => {
  const container = document.body;
  const tabOne = document.querySelector('.link1');
  const tabTwo = document.querySelector('.link2');
  const tabThree = document.querySelector('.link3');
  const tabs = document.querySelectorAll('.link');
  tabOne.classList.add('tabone');
  tabOne.addEventListener('click', () => {
    container.style.backgroundColor = 'rgb(238, 174, 195)';
    tabOne.classList.add('tabone');
    tabThree.classList.remove('tabone');
    tabTwo.classList.remove('tabone');
  });
  tabTwo.addEventListener('click', () => {
    container.style.backgroundColor = 'rgb(146, 146, 228)';
    tabTwo.classList.add('tabone');
    tabThree.classList.remove('tabone');
    tabOne.classList.remove('tabone');
  });
  tabThree.addEventListener('click', () => {
    container.style.backgroundColor = 'rgb(245, 233, 67)';
    tabThree.classList.add('tabone');
    tabOne.classList.remove('tabone');
    tabTwo.classList.remove('tabone');
  });
};

tabChange();
document.querySelector('#saveUserInfo').addEventListener('click', saveUserInfo);
