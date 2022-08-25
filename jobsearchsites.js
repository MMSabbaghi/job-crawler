const JobSearchSites = [
  {
    id: "e-estekhdam",
    url: "https://www.e-estekhdam.com/search/%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%88%DB%8C%D8%B3",
    siteName: "ای استخدام",
    selectors: {
      root: "https://www.e-estekhdam.com",
      card: ".job-list-item",
      title: "a.title",
      link: "a.title",
      company: ".company > a",
      place: ".provinces > span",
      img: `a.logo > img`,
    },
  },
  {
    id: "jobinja",
    url: "https://jobinja.ir/jobs/category/it-software-web-development-jobs/%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D9%88%D8%A8-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%88%DB%8C%D8%B3-%D9%86%D8%B1%D9%85-%D8%A7%D9%81%D8%B2%D8%A7%D8%B1?preferred_before=1654611851&sort_by=relevance_desc",
    siteName: "جابینجا",
    selectors: {
      root: "",
      card: ".o-listView__itemInfo",
      title: "a.c-jobListView__titleLink",
      link: "a.c-jobListView__titleLink",
      company: ".c-icon--construction + span",
      place: ".c-icon--place + span",
      img: ".o-listView__itemIndicatorImage",
    },
  },
];
