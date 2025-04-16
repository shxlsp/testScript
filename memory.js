// initial page load's url
function url() {
  return "https://joyday-pre.jd.com";
  // return "https://joyday.jd.com/schedule-detail?themeColor=light&mparam=%7B%22calendarId%22:%22949972055875395584%22,%22beginTime%22:1738906200000,%22endTime%22:1738908000000,%22scheduleId%22:%22EXCHANGE_1063770306331652096%22,%22isNeedCheck%22:true%7D&themeColor=light";
}

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time || 2000);
  });
}
function leakFilter(node, snapshot, leakedNodeIds) {
  // any unreleased node (JS heap object) with 1MB+
  // retained size is considered a memory leak
//   return node.retainedSize > 10000;
  return node.is_detached;
}
// action where you suspect the memory leak might be happening
async function action(page) {
  //   const res = await page.$('.view-schedule-item');
  //     console.log(res, '???res')
  //     debugger
  await page.click(".view-schedule-item");
  console.log(1);
  await sleep();
//   console.log(2);
  await await page.click(
    '[clstag="pageclick|keycount|PC_schedule_details_1676964587869|1"]'
  );
//   console.log(3);
//   await sleep();
//   console.log(4);
}

// how to go back to the state before action
async function back(page) {
    
  // await page.click(".calendar-tooltip-header .actions span:last-child");
  await page.click(".header-action-wrap:last-child");
  console.log(5);
}
async function beforeInitialPageLoad(page) {
  // before the initial page load
  page.evaluateOnNewDocument(() => {
    console.log(localStorage, "????localStorage");
    // localStorage.setItem("key", "value");
    // localStorage.removeItem("import-map-override:@jd/jsmf-joyday-comps")
    // localStorage.removeItem("import-map-override:@jd/joyday-mf-main")
    // localStorage.removeItem("import-map-override:@jd/joyday-detail-view")
    localStorage.setItem(
      "import-map-override:@jd/jsmf-joyday-comps",
      "http://localhost:9680/bundle.js"
    );
    localStorage.setItem(
      "import-map-override:@jd/joyday-mf-main",
      "http://localhost:9681/bundle.js"
    );
    localStorage.setItem(
      "import-map-override:@jd/joyday-detail-view",
      "http://localhost:9640/bundle.js"
    );
  });
}
function cookies() {
  console.log("cookies111");
  return [
    {
      name: "focus-token",
      value: "ee.40b823e6264fadc6ff63b4e514c90bd1",
      domain: ".jd.com",
    },
  ];
}
const repeat = () => 0;
module.exports = {
  action,
  back,
  url,
  cookies,
  repeat,
  beforeInitialPageLoad,
  leakFilter,
};
