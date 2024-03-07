import { useEffect, useState } from "react";

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIntersecting(entry?.target.id);
      } else {
        setIntersecting("");
      }
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

// const onScrollToBottom = document.getElementById("right");

// const onIntersection = ([{ isIntersecting, target }]) =>
//   isIntersecting && (target.style.backgroundColor = "green");

// const io = new IntersectionObserver(onIntersection, { threshold: 1 });

// io.observe(onScrollToBottom);

const element = document.getElementById("element");
let lastScrollTop = 0;
// document.addEventListener = (e) => {
//   if (element.scrollTop < lastScrollTop) {
//     // upscroll
//     return;
//   }
//   lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
//   if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
//     console.log("End");
//   }
// };

// var scrollableDiv = document.getElementById("element");

// scrollableDiv.addEventListener("scroll", function () {
//   var scrollTop = scrollableDiv.scrollTop;
//   var scrollHeight = scrollableDiv.scrollHeight;
//   var clientHeight = scrollableDiv.clientHeight;

//   // Check if scrolled to the bottom
//   if (scrollHeight - scrollTop === clientHeight) {
//     // Prevent further scrolling
//     scrollableDiv.scrollTop = scrollTop - 1;
//   }
// });
