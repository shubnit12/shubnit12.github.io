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
let inputvaluesAlert = document.querySelector(".inputvaluesAlert");

let contactSubmitButton = document.querySelector(".contactSubmitButton");
contactSubmitButton.onclick = function () {
  let nameInput = document.querySelector("#nameInput");
  let emailInput = document.querySelector("#emailInput");
  let messageInput = document.querySelector("#messageInput");
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    messageInput.value === ""
  ) {
    inputvaluesAlert.style.display = "block";
    setTimeout(() => {
      inputvaluesAlert.style.opacity = "1";
      setTimeout(() => {
        inputvaluesAlert.style.opacity = "0";
        setTimeout(() => {
          inputvaluesAlert.style.display = "none";
        }, 6000);
      }, 3000);
    }, 500);
  } else {
    // console.log("sending Data");
    let data = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
    }
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const raw = JSON.stringify(data);
// console.log(raw)
const requestOptions = {
  method: "POST",
  body: raw,
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.shubnit.com/recieveEmail", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result)
    if (result.success) {
      // console.log(" Data Sent Successfully");
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
      modal.style.display = "none";
    } else {
      // console.log(" Data Not Sent Successfully");
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
    }
  })
  .catch((error) => {console.error(error)
      // console.log(" Data Not Sent Successfully");
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
  });

  }

};

let contactSubmitButtonMail = document.querySelector(
  ".contactSubmitButtonMail"
);
contactSubmitButtonMail.onclick = function () {
  modal.style.display = "none";
  window.location =
    "mailto:ztbhgt@gmail.com?Subject=Hello, I am on your website and ...";
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

let Expressjs =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/Expressjs.png";
let JavaScript =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/JavaScript.png";
let Jenkins =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/Jenkins.png";
let MongoDB =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/MongoDB.svg";
let NodeJs =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/NodeJs.png";
let Playwright =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/Playwright.png";
let React =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/React.png";
let aws =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/aws.png";
let css =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/css.svg";
let git =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/git.png";
let html =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/html.svg";
let mongoosewebp =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/mongoose.webp";
let Visual_Studio =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/Visual_Studio.png";
let Windows =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/Windows.png";
let Unix =
  "https://raw.githubusercontent.com/shubnit12/shubnit12.github.io/refs/heads/main/images/UNIX.png";

let skillObj = [
  {
    skillTitle: "Language,Framework and library",
    skills: [
      { skillName: "JavaScript", skillImage: JavaScript },
      { skillName: "ReactJs", skillImage: React },
      { skillName: "NodeJs", skillImage: NodeJs },
      { skillName: "HTML", skillImage: html },
      { skillName: "CSS", skillImage: css },
      { skillName: "Expressjs", skillImage: Expressjs },
    ],
  },
  {
    skillTitle: "Tools & Technologies",
    skills: [
      { skillName: "Jenkins", skillImage: Jenkins },
      { skillName: "git", skillImage: git },
      { skillName: "Playwright", skillImage: Playwright },
      { skillName: "aws", skillImage: aws },
      { skillName: "VSCode", skillImage: Visual_Studio },
    ],
  },
  {
    skillTitle: "Databases",
    skills: [{ skillName: "MongoDB", skillImage: MongoDB }],
  },
  {
    skillTitle: "Operating Systems",
    skills: [
      { skillName: "Unix", skillImage: Unix },
      { skillName: "Windows", skillImage: Windows },
    ],
  },
];
let fixedSkills = document.querySelector(".fixedSkills");

function createSkills() {
  let skillSectionDiv = document.createElement("div");
  skillSectionDiv.setAttribute("class", "skillSection");
  skillObj.forEach((skill) => {
    let skillTitleDiv = document.createElement("div");
    let skillsDiv = document.createElement("div");

    skillTitleDiv.setAttribute("class", "skillTitle");
    skillTitleDiv.style.fontSize = "13px";
    skillTitleDiv.style.overflowWrap = "anywhere";
    skillTitleDiv.style.marginBottom = "10px";
    skillTitleDiv.style.backgroundColor = "#c4c3c3";
    skillTitleDiv.style.gap = "5px";
    skillTitleDiv.style.padding = "5px";

    skillTitleDiv.textContent = skill.skillTitle;

    skillsDiv.setAttribute("class", "skills");
    skillsDiv.style.display = "grid";
    // skillsDiv.style.backgroundColor = "#fafafa";
    skillsDiv.style.gridTemplateColumns = "auto auto auto";

    skill.skills.forEach((oneSkill) => {
      let individualSkillDiv = document.createElement("div");
      individualSkillDiv.setAttribute("class", "individualSkill");
      // individualSkillDiv.style.backgroundColor = "#fafafa";
      individualSkillDiv.style.justifySelf = "center";
      individualSkillDiv.style.overflowWrap = "anywhere";
      individualSkillDiv.style.display = "flex";
      individualSkillDiv.style.alignItems = "center";
      individualSkillDiv.style.marginBottom = "10px";

      let spanElement = document.createElement("span");
      spanElement.innerText = oneSkill.skillName;
      let imgTag = document.createElement("img");
      imgTag.src = oneSkill.skillImage;
      imgTag.alt = oneSkill.skillName;
      imgTag.style.height = "20px";
      individualSkillDiv.appendChild(spanElement);
      individualSkillDiv.appendChild(imgTag);
      skillsDiv.appendChild(individualSkillDiv);
      // console.log(individualSkillDiv);
    });
    skillSectionDiv.appendChild(skillTitleDiv);
    skillSectionDiv.appendChild(skillsDiv);
    console.log(skillSectionDiv);
  });
  fixedSkills.appendChild(skillSectionDiv);
}
createSkills();

let count = 1;
const element = document.getElementById("element");
element.addEventListener("click", () => {
  if (count % 2 == 0) {
    pTag.style.color = "#000000";
    document.querySelectorAll(".individualSkill").forEach((element) => {
      element.style.color = "#000000";
      element.querySelectorAll("span").forEach((element) => {
        element.style.color = "#000000";
      });
    });
    document.querySelectorAll(".personalProjectHeading").forEach((element) => {
      element.style.backgroundColor = "#cfcfcf";
      element.style.color = "#000000";
      element.querySelectorAll("span").forEach((element) => {
        element.style.backgroundColor = "#cfcfcf";
        element.style.color = "#000000";
      });
    });
    document.querySelectorAll(".experienceHeading").forEach((element) => {
      element.style.backgroundColor = "#cfcfcf";
      element.style.color = "#000000";
      element.querySelectorAll("span").forEach((element) => {
        element.style.backgroundColor = "#cfcfcf";
        element.style.color = "#000000";
      });
    });
    document.querySelectorAll("#articleHeadings").forEach((element) => {
      element.style.backgroundColor = "#c4c3c3";
    });
    document.querySelectorAll(".skillTitle").forEach((element) => {
      element.style.backgroundColor = "#c4c3c3";
    });
    element.style.animationIterationCount = count;
    element.style.transform = "translateX(1vw) rotate(0deg) ";
    element.style.animationIterationCount = "1";
    element.style.animationName = "ocilate";

    element.style.backgroundColor = "rgb(252, 151, 19)";
    setTimeout(() => {
      element.style.boxShadow = "0px 0px 30px 10px rgb(248, 217, 15)";
    }, 1000);
    document.querySelector("body").style.backgroundColor = "#e2e4e9";
    document.querySelectorAll("p").forEach((element) => {
      element.style.color = "#000000";
    });
  } else {
    document.querySelectorAll(".individualSkill").forEach((element) => {
      element.style.color = "#B6C2CF";
      element.querySelectorAll("span").forEach((element) => {
        element.style.color = "#B6C2CF";
      });
    });
    document.querySelectorAll(".personalProjectHeading").forEach((element) => {
      element.style.backgroundColor = "#505050";
      element.style.color = "#B6C2CF";
      element.querySelectorAll("span").forEach((element) => {
        element.style.backgroundColor = "#505050";
        element.style.color = "#B6C2CF";
      });
    });
    document.querySelectorAll(".experienceHeading").forEach((element) => {
      element.style.backgroundColor = "#505050";
      element.style.color = "#B6C2CF";
      element.querySelectorAll("span").forEach((element) => {
        element.style.backgroundColor = "#505050";
        element.style.color = "#B6C2CF";
      });
    });
    document.querySelectorAll("#articleHeadings").forEach((element) => {
      element.style.backgroundColor = "rgb(138 135 135)";
    });
    document.querySelectorAll(".skillTitle").forEach((element) => {
      element.style.backgroundColor = "rgb(138 135 135)";
    });
    element.style.animationIterationCount = count;
    element.style.backgroundColor = "transparent";
    element.style.transform = "translateX(93vw) rotate(0deg) ";
    element.style.animationIterationCount = "1";
    element.style.animationName = "ocilate";
    setTimeout(() => {
      element.style.boxShadow = "-11px 11px 0 0 rgb(169, 170, 167)";
    }, 1000);
    document.querySelector("body").style.backgroundColor = "#22272B";
    document.querySelectorAll("p").forEach((element) => {
      element.style.color = "#B6C2CF";
    });
    setTimeout(() => {
      document.querySelector(".currentPercent").querySelector("p").style.color =
        "rgb(236 236 236)";
    }, 2000);
  }
  setTimeout(() => {
    element.style.animationName = "";
  }, 2000);

  count++;
});
const wireframeLink =
  "https://www.canva.com/design/DAGbf8UqK40/_5E2rePDXDMN7j9C8pQxcQ/view?utm_content=DAGbf8UqK40&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h14f02ca3c0";

const downloadResumeButton = document.querySelector(".downloadResumeButton");

downloadResumeButton.addEventListener("click", () => {
  console.log("download clicked");
});
