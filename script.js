const clientHeight = document.documentElement.clientHeight;
const clientWidth = document.documentElement.clientWidth;
const vids = document.querySelectorAll("video");

window.onload = () => {
  document.querySelector(".buttons").style.transform = "translate(0,0)";
};

vids.forEach((i) => {
  i.pause();
  i.onloadedmetadata = () => {
    duration = Math.floor(i.duration);
    i.parentElement.children[0].children[0].innerHTML = `<p>${Math.floor(
      duration / 60
    )}:${(duration % 60).toString().padStart(2, 0)}</p>`;
  };
});

document.addEventListener("scroll", () => {
  flag = true;
  vids.forEach((i) => {
    if (
      flag &&
      i.getBoundingClientRect().y < clientHeight &&
      i.getBoundingClientRect().x < clientWidth &&
      i.getBoundingClientRect().top > 0 &&
      i.getBoundingClientRect().bottom > 0
    ) {
      console.log(i);
      i.play();
      i.parentElement.children[0].style.opacity = "0";
      flag = false;
    } else {
      i.pause();
      i.parentElement.children[0].style.opacity = "1";
    }
    // console.log(i.outerHTML);
  });
});
