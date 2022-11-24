import { POPUP_OPTIONS } from '../../src/const';

export const getElements = (query) => {
  let elements;
  if (document.querySelectorAll(query).length > 0)
    elements = document.querySelectorAll(query);
  else
    elements = document
      .querySelector('iframe#tool_content')
      .contentWindow.document.body.querySelectorAll(query);

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
