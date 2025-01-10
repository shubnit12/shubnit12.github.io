console.log("pp/pp.js");
var w = window.innerWidth;
var h = window.innerHeight;
console.log("w: " + w + ", h: " + h);

var links = document.querySelectorAll("a");
links.forEach(function (link) {
  link.setAttribute("target", "_blank");
});

window.onclick = function (event) {
  //   console.log(event.target);
};

var modal = document.getElementById("myModal");

var btn = document.querySelector(".contactButton");

btn.onclick = function () {
  modal.style.display = "flex";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
let successEmailAlert = document.querySelector(".successEmailAlert");
let errorEmailAlert = document.querySelector(".errorEmailAlert");

let contactSubmitButton = document.querySelector(".contactSubmitButton");
contactSubmitButton.onclick = function () {
  modal.style.display = "none";
  console.log("do backnd stuff to send mail");

  //   window.location = "mailto:shubnit99@gmail.com";

  successEmailAlert.style.display = "block";
  setTimeout(() => {
    successEmailAlert.style.opacity = "1";
    setTimeout(() => {
      successEmailAlert.style.opacity = "0";
      setTimeout(() => {
        successEmailAlert.style.display = "none";
      }, 6000);
    }, 3000);
  }, 500);

  errorEmailAlert.style.display = "block";
  setTimeout(() => {
    errorEmailAlert.style.opacity = "1";
    setTimeout(() => {
      errorEmailAlert.style.opacity = "0";
      setTimeout(() => {
        errorEmailAlert.style.display = "none";
      }, 6000);
    }, 3000);
  }, 500);
};

let contactSubmitButtonMail = document.querySelector(
  ".contactSubmitButtonMail"
);
contactSubmitButtonMail.onclick = function () {
  modal.style.display = "none";
  window.location =
    "mailto:shubnit99@gmail.com?Subject=Hello, I am on your website and ...";
};

const startOf2025 = new Date("January 1, 2025 00:00:00").getTime();
const total2025 = new Date("December 31, 2025 23:59:59").getTime();

let totalMSin2025 = total2025 - startOf2025;

let pTag = document.createElement("p");
const currentPercent = document.querySelector(".currentPercent");
currentPercent.appendChild(pTag);
let progressBar = document.querySelector(".innerCurrentPercentage");
// pTag.innerText = ratiocompleted;
function percentageCalc() {
  let timeElapsed = new Date() - startOf2025;
  let ratiocompleted = timeElapsed / totalMSin2025;
  let percentage = (ratiocompleted * 100).toFixed(12);

  pTag.innerText = percentage;
  progressBar.style.width = percentage + "%";
  requestAnimationFrame(percentageCalc);
}
requestAnimationFrame(percentageCalc);

document.addEventListener("DOMContentLoaded", function () {
  const skillImages = [
    {
      src: "../techLogos/1_OYpEW3PMltGC2MVvJ-5QTw.webp",
      alt: "Mongoose",
      name: "Mongoose",
    },
    {
      src: "../techLogos/Expressjs.png",
      alt: "Express.js",
      name: "Express.js",
    },
    {
      src: "../techLogos/Jenkins_logo_with_title.svg.png",
      alt: "Jenkins",
      name: "Jenkins",
    },
    {
      src: "../techLogos/MongoDB_Fores-Green.svg",
      alt: "MongoDB",
      name: "MongoDB",
    },
    {
      src: "../techLogos/Playwright_Logo.svg.png",
      alt: "Playwright",
      name: "Playwright",
    },
    { src: "../techLogos/Git-logo.svg.png", alt: "Git", name: "Git" },
    { src: "../techLogos/React_Logo_SVG.svg.png", alt: "React", name: "React" },
    { src: "../techLogos/Node.js_logo.png", alt: "Node.js", name: "Node.js" },
    {
      src: "../techLogos/JavaScript-logo.png",
      alt: "JavaScript",
      name: "JavaScript",
    },
    {
      src: "../techLogos/Html5_css3_styling.svg",
      alt: "HTML/CSS",
      name: "HTML/CSS",
    },
    {
      src: "../techLogos/Amazon_Web_Services_Logo.svg.png",
      alt: "AWS",
      name: "AWS",
    },
  ];
  const skillsContainer = document.getElementById("skillsImages");
  skillImages.forEach((skill) => {
    const skillWrapper = document.createElement("div");
    skillWrapper.classList.add("skill");

    const img = document.createElement("img");
    img.src = skill.src;
    img.alt = skill.alt;
    img.style.width = "5vw";

    const label = document.createElement("p"); // Create a paragraph element for the name
    label.textContent = skill.name; // Set the text to the skill name
    label.classList.add("skill-label"); // Optional: add a class for styling

    skillWrapper.appendChild(img);
    skillWrapper.appendChild(label); // Append the label under the image
    skillsContainer.appendChild(skillWrapper); // Append the whole wrapper to the container
  });
});
