import { wait } from './util/common.js';
import { fetchWithAuth } from './util/network.js';
import {
  openPopup,
  getElements,
  hideElements,
  clickAllElements,
} from './util/dom';

window.onload = async function () {
  setTimeout(async () => {
    const lectureInfoUrl = lectureInfoUrlBuilder();
    const lectureInfo = await fetchWithAuth(lectureInfoUrl);
    await mainScript(lectureInfo);
    getElements('.xncb-section-header-index-number').forEach(
      async (weekDropButton) => {
        weekDropButton.onclick = async (e) => {
          // [ERR] wait for week toggle open needed
          await wait(0.25);
          await mainScript(lectureInfo);
        };
      }
    );
    getElements('.xncb-section-header-info-wrapper').forEach((weekHeader) => {
      weekHeader.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
    });
  }, 1000);
};

const mainScript = async (lectureInfo) => {
  // toggleAllWeek();

  getElements('.xncb-component-main-wrapper').forEach(async (ele) => {
    if (ele.getElementsByClassName('extension-popupButton').length > 0) return;
    // if (!ele.previousSibling.classList.contains('mp4')) return;

    const lectureName = ele.firstChild.innerText;
    const { sectionId, subsectionId, unitId, componentId } =
      await findSectionUnitId(lectureName, lectureInfo);
    const videoUrl = videoUrlBuilder(sectionId, unitId);
    const fileSectionUrl = fileSectionUrlBuiler(
      sectionId,
      subsectionId,
      unitId,
      componentId
    );

    const popupButtonBox = document.createElement('div');
    popupButtonBox.style.display = 'flex';
    popupButtonBox.style.flexDirection = 'row';
    popupButtonBox.style.gap = '0.5rem';

    const lecturePopupButton = buttonBuilder(
      `팝업으로 열기`,
      videoUrl,
      componentId,
      openPopup
    );

    const pdfPopupButton = buttonBuilder(
      `pdf 열기`,
      fileSectionUrl,
      componentId,
      pdfDownOpen
    );

    const fileDownloadLinkButton = buttonBuilder(
      `파일 다운`,
      fileSectionUrl,
      '파일 다운로드',
      fileDownOpen
    );

    popupButtonBox.appendChild(lecturePopupButton);
    popupButtonBox.appendChild(pdfPopupButton);
    popupButtonBox.appendChild(fileDownloadLinkButton);
    ele.appendChild(popupButtonBox);
  });
};

const buttonBuilder = (title, videoUrl, tabName, onClickFunc) => {
  const popupElement = document.createElement('div');
  popupElement.className = 'extension-popupButton';
  popupElement.innerHTML = title;
  popupElement.style.backgroundColor = '#14AAF5';
  popupElement.style.borderRadius = '1rem';
  popupElement.style.width = '10rem';
  popupElement.style.color = 'white';
  popupElement.style.textAlign = 'center';
  popupElement.onclick = (e) => onClickFunc(e, videoUrl, tabName);

  return popupElement;
};

const pdfDownOpen = async (e, fileDownUrl, title) => {
  e.stopPropagation();
  e.preventDefault();
  const url = await getPdfUrl(fileDownUrl);
  openPopup(e, url, title);
};

const fileDownOpen = async (e, fileDownUrl) => {
  e.stopPropagation();
  e.preventDefault();
  const metaUrl = await getFileUrl(fileDownUrl);
  const fileInfo = await fetchWithAuth(metaUrl);
  window.open(fileInfo.result.download_url);
};

const toggleAllWeek = () => {
  const listBtns = getElements('.xncb-section-header-index-number');
  clickAllElements(listBtns);
  hideElements(listBtns);
};

const getPdfUrl = async (fileSectorInfoUrl) => {
  const pdfInfo = await fetchWithAuth(fileSectorInfoUrl);
  const url = `https://commons.ssu.ac.kr/contents15/ssu1000001/${pdfInfo.commons_content.content_id}/contents/web_files/original.pdf`;
  return url;
};

const getFileUrl = async (fileSectorInfoUrl) => {
  const fileInfo = await fetchWithAuth(fileSectorInfoUrl);
  const url = `https://canvas.ssu.ac.kr/learningx/api/v1/commons/contents?content_id=${fileInfo.commons_content.content_id}`;
  return url;
};

const videoUrlBuilder = (sectionId, unitId) => {
  const courseId = getElements('#custom_canvas_course_id')[0].value;
  const userId = getElements('#custom_user_id')[0].value;
  const loginId = getElements('#custom_canvas_user_login_id')[0].value;
  const nameFull = getElements('#custom_user_name_full')[0].value;
  const email = getElements('#custom_user_email')[0].value;

  const url = `https://canvas.ssu.ac.kr/learningx/coursebuilder/course/${courseId}/learn/${sectionId}/unit/${unitId}/view?user_id=${userId}&user_login=${loginId}&user_name=${nameFull}&user_email=${email}&role=1&is_observer=false&locale=ko&mode=default`;
  return url;
};

const lectureInfoUrlBuilder = () => {
  const courseId = getElements('#custom_canvas_course_id')[0].value;
  const userId = getElements('#custom_user_id')[0].value;
  const url = `https://canvas.ssu.ac.kr/learningx/api/v1/courses/${courseId}/sections_db?user_id=${userId}&role=1&type=`;
  return url;
};

const fileSectionUrlBuiler = (sectionId, subsectionId, unitId, componentId) => {
  const courseId = getElements('#custom_canvas_course_id')[0].value;
  const userId = getElements('#custom_user_id')[0].value;
  const loginId = getElements('#custom_canvas_user_login_id')[0].value;
  const url = `https://canvas.ssu.ac.kr/learningx/api/v1/courses/${courseId}/sections/${sectionId}/subsections/${subsectionId}/units/${unitId}/components/${componentId}?user_id=${userId}&user_login=${loginId}&force_submit=true&mode=default`;
  return url;
};
const findSectionUnitId = async (title, lectureInfo) => {
  let sectionId, unitId, componentId, subsectionId;
  lectureInfo.forEach((week) => {
    week.subsections.forEach((section) => {
      section.units.forEach((unit) => {
        unit.components.forEach((component) => {
          if (component.title === title) {
            sectionId = week.section_id;
            unitId = unit.unit_id;
            componentId = component.component_id;
            subsectionId = section.subsection_id;
            return false;
          }
        });
        return false;
      });
      return false;
    });
    return false;
  });
  return { sectionId, unitId, componentId, subsectionId };
};
