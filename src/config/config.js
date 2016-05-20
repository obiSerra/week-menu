import baseurl from './baseurl.js';

const config = {
    dayUrl: (day) => `${baseurl}/day-list/${day.date}-${day.months}-${day.years}.json`,
    dayListUrl: () => `${baseurl}/day-list.json`
};

export default config;