import { animateScroll as scroll } from 'react-scroll';

export const scrollToBottom = () => {
  scroll.scrollToBottom({
    duration: 1000,
    delay: 100,
    smooth: "easeInOutQuint",
    containerId: 'dictionaryTable'
  })
}