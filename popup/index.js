/* js code for the background color and icon color change */

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
