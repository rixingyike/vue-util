// 将utc时间戳格式化为本地时间字符串
// 格式：YYYY/YY|MM|DD|hh|mm|ss
// @ms utc ms
// @format YYYY/YY|MM|DD|hh|mm|ss
// @return local date string
function formatUTCMSToLocalDateString(ms, format) {
  var date = new Date(convertUTCMSToLocal(ms));
  var year = date.getFullYear() + "";
  var month = format2n(date.getMonth() + 1) + "";
  var day = format2n(date.getDate()) + "";
  var hour = format2n(date.getHours()) + "";
  var minute = format2n(date.getMinutes()) + "";
  var second = format2n(date.getSeconds()) + "";
  return format
    .replace(/YYYY/g, year)
    .replace(/YY/g, year.slice(2))
    .replace(/MM/g, month)
    .replace(/DD/g, day)
    .replace(/hh/g, hour)
    .replace(/mm/g, minute)
    .replace(/ss/g, second);
}
function format2n(val) {
    return val < 10 ? "0" + "" + val : val;
  }

// 将utc时间戳格式化为本地人类友好字符串
function formatUTCMSToLocalHumanDateString(ms) {
  let date = new Date(ms);
  let delta = Math.round((+new Date() - date) / 1000);

  let minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

  let fuzzy;

  if (delta < 30) {
    fuzzy = "刚刚";
  } else if (delta < minute) {
    fuzzy = ` ${delta} 秒前`;
  } else if (delta < 2 * minute) {
    fuzzy = " 1 分钟前";
  } else if (delta < hour) {
    fuzzy =  ` ${Math.floor(delta / minute)} 分钟前`;
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = " 1 小时前";
  } else if (delta < day) {
    fuzzy = ` ${Math.floor(delta / hour)} 小时前`;
  } else if (delta < day * 2) {
    fuzzy = "昨天";
  } else if (delta < day * 3) {
    fuzzy = "前天";
  } else if (delta < week) {
    fuzzy = "一周内";
  } else {
    fuzzy = formatUTCMSToLocalDateString(ms, "YY/MM/DD hh:mm:ss");
  }

  return fuzzy;
}

// 获取当前的utc时间戳
function getUTCMSOfNow() {
  // 从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。
  return getUTCMSOfDate(new Date());
}

// 获取utc时间戳
function getUTCMSOfDate(d) {
  return d.valueOf();
}

// 与utc时间戳本地某时间比较
// @return -1(a < b), 1(a > b)
function compareUTCMSAndLocalDate(ms, d) {
  return convertUTCMSToLocal(ms) < d ? -1 : 1;
}

// 与utc时间戳当前时间比较
function compareUTCMSAndNow(ms) {
  return compareUTCMSAndLocalDate(ms, new Date());
}

// 将utc时间戳转化为本地时间戳
function convertUTCMSToLocal(ms) {
  let date = new Date(ms);
  let localOffset = date.getTimezoneOffset() * 60000;
  // let localTime = date.getTime();
  return ms - localOffset;
}

export default{
  formatUTCMSToLocalDateString,
  formatUTCMSToLocalHumanDateString,
  getUTCMSOfNow,
  getUTCMSOfDate,
  compareUTCMSAndLocalDate,
  compareUTCMSAndNow,
  convertUTCMSToLocal
}