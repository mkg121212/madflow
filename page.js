const revealItems = document.querySelectorAll(".reveal");
const supportMenu = document.querySelector(".supportMenu");
const supportButton = document.querySelector(".supportButton");
const themeToggle = document.querySelector(".themeToggle");
const liveScore = document.querySelector("#liveScore");
const scoreTier = document.querySelector("#scoreTier");
const scoreRemark = document.querySelector("#scoreRemark");
const scoreReadout = document.querySelector(".scoreReadout");
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("madflow-theme");
} catch {
  savedTheme = null;
}

if (savedTheme === "light") {
  document.body.classList.add("lightMode");
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("isVisible"));
}

supportButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  supportMenu?.classList.toggle("isOpen");
});

themeToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isLight = document.body.classList.toggle("lightMode");
  try {
    localStorage.setItem("madflow-theme", isLight ? "light" : "dark");
  } catch {
    // Theme still switches for the current session.
  }
});

document.addEventListener("click", (event) => {
  if (!supportMenu?.contains(event.target)) {
    supportMenu?.classList.remove("isOpen");
  }
});

const scorePhrases = [
  {
    min: 0,
    max: 19,
    tier: "极差档",
    lines: [
      "现在转行还不晚。",
      "像用洗衣机拍的。",
      "剪它，不如剪头发。",
      "后期看了想报警。",
      "事故现场。",
      "老板看了沉默。",
      "达芬奇也救不回来。",
      "这批建议放进回收站。"
    ]
  },
  {
    min: 20,
    max: 39,
    tier: "较差档",
    lines: [
      "医生说希望不大。",
      "这素材得靠后期续命。",
      "勉强能用。",
      "看得出来机器当时也很紧张。",
      "像拍摄师灵魂出窍。",
      "帕金森早期。",
      "这不是废片，是半废不废。",
      "老板不看细节就能过的素材。"
    ]
  },
  {
    min: 40,
    max: 59,
    tier: "一般档",
    lines: [
      "勉强能用。",
      "普普通通，至少没离谱。",
      "能用，但不建议太自信。",
      "这条像打工人：还能撑。",
      "中规中矩，没惊喜也没惊吓。",
      "当个过渡镜头刚刚好。",
      "适合默默待在时间线角落。",
      "不出彩，但也不添乱。"
    ]
  },
  {
    min: 60,
    max: 74,
    tier: "不错档",
    lines: [
      "这条素材挺能打。",
      "稍微调一下就能上桌。",
      "有点东西，可以进备选。",
      "质量在线，后期压力小点了。",
      "这条能用，而且不丢人。",
      "看得出来，拍的时候手没抖。",
      "剪辑师会点头的素材。",
      "不错，时间线欢迎它。"
    ]
  },
  {
    min: 75,
    max: 89,
    tier: "优秀档",
    lines: [
      "这批可以当主角。",
      "剪进去有排面。",
      "这素材一看就不便宜。",
      "后期看到会露出微笑。",
      "这条不用救。",
      "画面状态不错。",
      "稳得像开了外挂。",
      "领导看了会说“就这个”。"
    ]
  },
  {
    min: 90,
    max: 100,
    tier: "完美档",
    lines: [
      "这是我见过最好的素材！",
      "这条素材可以直接封神。",
      "别剪了，直接供起来。",
      "摄影今天手感像开光了。",
      "这条像从样片里偷来的。",
      "好得有点不讲武德。",
      "这素材自己会讲故事。",
      "这不剪出来是片子的损失。"
    ]
  }
];

function renderScore() {
  if (!liveScore || !scoreTier || !scoreRemark || !scoreReadout) return;

  const score = Math.floor(8 + Math.random() * 93);
  const bucket = scorePhrases.find((item) => score >= item.min && score <= item.max);
  const line = bucket.lines[Math.floor(Math.random() * bucket.lines.length)];
  const hue = Math.round(185 - (score / 100) * 169);
  const lightness = Math.round(54 + (score / 100) * 8);
  const color = `hsl(${hue}, 92%, ${lightness}%)`;

  liveScore.classList.add("isRolling");
  window.setTimeout(() => {
    liveScore.textContent = String(score);
    scoreTier.textContent = bucket.tier;
    scoreRemark.textContent = line;
    scoreReadout.style.setProperty("--score-color", color);
    liveScore.classList.remove("isRolling");
  }, 180);
}

renderScore();
setInterval(renderScore, 1900);
