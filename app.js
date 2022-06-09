const cheerio = require("cheerio");
const axios = require("axios");
const JobSearchSites = require("./jobsearchsites");

async function loadData(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    console.log(error);
    throw new Error(error.code || "Error");
  }
}

async function getJobs({ url, siteName, selectors }) {
  const $ = await loadData(url);

  const jobs = $(selectors.card).map((_i, el) => {
    const findEl = (selector) => $(el).find(selector);
    const selectInfo = (selector) => findEl(selector).text().trim();
    const selectLink = ($, attr) => selectors.root + findEl($).attr(attr);

    return {
      title: selectInfo(selectors.title),
      place: selectInfo(selectors.place),
      company: selectInfo(selectors.company),
      link: selectLink(selectors.link, "href"),
      img: selectLink(selectors.img, "src"),
      siteName,
    };
  });

  return jobs.toArray();
}

async function getAllJobs() {
  const jobPromises = JobSearchSites.map((site) => getJobs(site));
  const jobs = await Promise.all(jobPromises);
  return jobs.flat();
}

function renderJob(jobInfo) {
  const { title, place, img, company, siteName, link } = jobInfo;
  return `
  <div class="card mb-3">
  <div class="row g-0">
  <div class="col-sm-1">
  <img src="${img}" class="w-100 rounded-start">
  </div>
  <div class="col-sm-11">
  <div class="card-body">
      <a href="${link}" style="text-decoration: none;" >
        <h5 class="card-title">${title || "-"}</h5>
      </a>
        <ul class="list-group list-group-flush bg-light">
          <li class="list-group-item">${company || "-"}</li>
          <li class="list-group-item">${place || "-"}</li>
          <li class="list-group-item text-success fw-bold">« ${
            siteName || "-"
          } »</li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderJobs(jobs) {
  const jobWrapper = document.querySelector(".job-cards");
  jobWrapper.innerHTML = "";
  shuffle(jobs).forEach((job) => (jobWrapper.innerHTML += renderJob(job)));
}

function renderError() {
  const fetchStatusEl = document.querySelector(".job-fetch-status");
  fetchStatusEl.parentElement.classList.replace("bg-dark", "bg-danger");
  fetchStatusEl.innerHTML = `
  <h5 class="text-light mb-3">  خطا در دریافت اطلاعات </h5>
  <button class="btn btn-light btn-sm" onclick="window.location.reload()"> بارگذاری مجدد !</button>
  `;
}

(async function main() {
  try {
    const jobs = await getAllJobs();
    renderJobs(jobs);
  } catch (error) {
    alert(error)
    renderError();
  }
})();
