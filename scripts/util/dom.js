import { POPUP_OPTIONS } from '../../src/const.js';

export const getElements = (query) => {
  if (!query) return;
  let elements;

  if (document.querySelectorAll(query).length > 0)
    elements = document.querySelectorAll(query);
  else
    elements = document
      .querySelector('iframe#tool_content')
      ?.contentWindow?.document?.body?.querySelectorAll(query);

  return elements;
};

export const openPopup = (e, videoUrl, lectureName) => {
  e.stopPropagation();
  e.preventDefault();
  window.open(videoUrl, lectureName || 'LMS', POPUP_OPTIONS);
};

export const getCookie = (cookieName) => {
  let cookieValue = null;
  if (document.cookie) {
    var array = document.cookie.split(escape(cookieName) + '=');
    if (array.length >= 2) {
      var arraySub = array[1].split(';');
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
};

export const hideElements = (elements) => {
  elements.forEach((ele) => (ele.style.display = 'none'));
};

export const clickAllElements = (elements) => {
  elements.forEach((ele) => ele.click());
};

// pip
export const openVideoOnPIP = async (video) => {
  if (!'pictureInPictureEnabled' in document)
    return alert('해당 환경은 pip를 지원하지 않습니다');
  await video.requestPictureInPicture();
};

export const buttonBuilder = (title, url, tabName, onClickFunc) => {
  const popupElement = document.createElement('div');
  popupElement.className = 'extension-popupButton';
  popupElement.innerHTML = title;
  popupElement.style.backgroundColor = '#14AAF5';
  popupElement.style.borderRadius = '1rem';
  popupElement.style.width = '10rem';
  popupElement.style.color = 'white';
  popupElement.style.textAlign = 'center';
  popupElement.onclick = (e) => onClickFunc(e, url, tabName);

  return popupElement;
};
