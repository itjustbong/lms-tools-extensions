(async () => {
  if (window.location.pathname !== '/login/login.do') return;
  const src = chrome.runtime.getURL('scripts/util/dom.js');
  const content = await import(src);
  const getElements = content.getElements;

  chrome.storage.sync.get(['soongFiID', 'soongFiPW'], (data) => {
    if (!data.soongFiID || !data.soongFiPW) return;
    const res = window.confirm('LMS Tools에 저장된 정보로 로그인합니다');
    if (res) {
      getElements('input[name=user_id]')[0].value = data.soongFiID;
      getElements('input[name=password]')[0].value = data.soongFiPW;
      getElements('img[alt="입렵한 정보를 이용하여 로그인합니다."]')[0].click();
    }
  });
})();
