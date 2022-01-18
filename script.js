const clientHeight = document.documentElement.clientHeight;
const clientWidth = document.documentElement.clientWidth;
const vids = document.querySelectorAll("video");

let wait = true;

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
      // console.log(i);
      i.play();
      i.parentElement.children[0].style.opacity = "0";
      flag = false;
    } else {
      i.pause();
      i.parentElement.children[0].style.opacity = "1";
    }
    // console.log(i.outerHTML);
  });

  if (
    wait &&
    Number(
      (
        (window.innerHeight + window.scrollY) /
        document.documentElement.scrollHeight
      ).toFixed(2)
    ) === 0.99
  ) {
    wait = false;
    document.querySelector(".loader_section").classList.add("active");
    setTimeout(addContent, 2000);
  }
});

for (let i = 0; i < vids.length; i++) {
  vids[i].addEventListener("mouseenter", () => {
    vids[i].muted = false;
  });
  vids[i].addEventListener("mouseout", () => {
    vids[i].muted = true;
  });
}

const addContent = () => {
  console.log("bottom");
  const cards = [
    "card_x-small",
    "card_small",
    "card_medium",
    "card_large",
    "card_x-large",
  ];
  const cardCount = getRandomInt(10, 30);
  let finalStr = "";
  for (let i = 0; i < cardCount; i++) {
    let cardSize = cards[getRandomInt(0, 5)];
    let isAlbum = getRandomInt(0, 6) === getRandomInt(0, 6) ? true : false;
    let isVideo = getRandomInt(0, 6) === getRandomInt(0, 6) ? true : false;
    let str = `<div class="card ${cardSize} skeleton">
    <div class="img _skeleton"></div>
  </div>`;
    finalStr += str;
    // console.log(cardCount, cardSize, isAlbum,isVideo);
  }
  document.querySelector(".pin_container").innerHTML += finalStr;
  document.querySelector(".loader_section").classList.remove("active");

  wait = true;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
