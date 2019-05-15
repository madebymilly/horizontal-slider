import "./styles.less";

var slider = {

  sections: document.getElementById("sections"),
  pagination: document.getElementById("pagination"),
  paginationLinks: pagination.querySelectorAll("li a"),
  paginationLinkPrev: pagination.querySelector(".js-prev"),
  paginationLinkNext: pagination.querySelector(".js-next"),
  navigation: document.getElementById("navigation"),
  navigationLinks: navigation.querySelectorAll(".js-nav"),
  navigationLinkPrev: navigation.querySelector(".js-nav--prev"),
  navigationLinkNext: navigation.querySelector(".js-nav--next")
}

function loadBg() {

  const image = document.createElement("img")
  image.setAttribute("id", "bg-image");

  const bg = document.getElementById("bg");

  const src = bg.getAttribute('data-src');
  bg.appendChild(image);
  image.src = src;

  const downloadedImage = new Image();
  downloadedImage.src = src;

  downloadedImage.onload = function() {
    bg.className = "loaded";
  };

}

function activatePaginationLink( section ) {
  const newLink = slider.pagination.querySelector("." + section.id);
  for (var i = 0; i < slider.paginationLinks.length; i++) {
    slider.paginationLinks[i].classList.remove("is-active");
  }
  newLink.classList.add("is-active");
}

function hideArrows() {
  const current = slider.sections.querySelector(".is-active");
  const hiddenLinks = slider.navigation.querySelectorAll(".hide");
  for (var i = 0; i < hiddenLinks.length; i++) {
    hiddenLinks[i].classList.remove("hide");
  }
  // Hide arrow if first or last slide:
  if (current.id == slider.sections.firstElementChild.id) {
    slider.navigationLinkPrev.classList.add("hide");
  } else if (current.id == slider.sections.lastElementChild.id) {
    slider.navigationLinkNext.classList.add("hide");
  }
}

function changeSection( link ) {
  const current = slider.sections.querySelector(".is-active");
  current.classList.remove("is-active");

  let newSection;
  if (link.classList.contains("js-nav")) {
    var i = parseInt(current.id.substr(8)) + 1;
    if (link.classList.contains("js-nav--prev")) {
      i = parseInt(current.id.substr(8)) - 1;
    }
    newSection = sections.querySelector("#section-" + i);
  } else {
    newSection = sections.querySelector("#" + link.className);
  }

  const imagePos = newSection.getAttribute("data-image-pos");
  const bg = document.getElementById("bg");
  const bgImg = document.getElementById("bg-image");
  const bgWidth = bgImg.offsetWidth;
  const imagePos2 = bgWidth / 100 * imagePos;

  const transf = "translate3d( -" + imagePos2 + "px, 0, 0)";
  bgImg.style.WebkitTransform = transf;
  bgImg.style.msTransform = transf;
  bgImg.style.transform = transf;

  newSection.classList.add("is-active");

  activatePaginationLink(newSection);
  hideArrows(newSection);

  // If last section: move BG
  if (newSection.id == slider.sections.lastElementChild.id) {
    let transf = "translate3d( -64%, 0, 0)";
    setTimeout(function () {
      bg.style.WebkitTransform = transf;
      bg.style.msTransform = transf;
      bg.style.transform = transf;
    }, 700);
  } else {
    bg.style = "";
  }
}

slider.init = function() {

  loadBg();

  const current = slider.sections.querySelector(".is-active");
  activatePaginationLink(current);
  hideArrows(current);

  Array.from(slider.paginationLinks).forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      changeSection(link);
    });
  });

  Array.from(slider.navigationLinks).forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      changeSection(link);
    });
  });

};

export default slider;
