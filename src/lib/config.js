const config = {
    dayUrl: (day) => `https://shining-fire-9964.firebaseio.com/day-list/${day.date}-${day.months}-${day.years}.json`,
    dayListUrl: () => `https://shining-fire-9964.firebaseio.com/day-list.json`

};

export default config;