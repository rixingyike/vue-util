import util from './index'

console.log("util.time test")
// let d = new Date()
// console.log("d", d.toUTCString())
let ms = util.time.getUTCMSOfNow()// d.valueOf()
console.log("ms date", new Date(ms).toString())
console.log(new Date(ms).getTimezoneOffset())
let localMs = ms - new Date(ms).getTimezoneOffset() * 60000;
console.log("localMs date", new Date(localMs).toString())

console.assert(util.time.convertUTCMSToLocal(ms) == localMs,'convertUTCMSToLocal')
console.assert(util.time.compareUTCMSAndNow(ms)==1, "compareUTCMSAndNow -1")
console.assert(util.time.compareUTCMSAndLocalDate(ms, new Date)==1, "compareUTCMSAndLocalDate -1")
console.log(util.time.formatUTCMSToLocalHumanDateString(ms-24*60*60*1000))
console.assert(util.time.formatUTCMSToLocalHumanDateString(ms)=='刚刚', '')
// console.assert(util.time.formatUTCMSToLocalHumanDateString(ms)=='', '')
console.log(util.time.formatUTCMSToLocalDateString(ms, "YY/MM/DD hh:mm:ss"))

// console.log(util.formatDate(Date.now(), 'YYYYMMDD hh:mm:ss'))
// console.assert(util.formatDate(Date.now(), 'YYYYMMDD')=='20190428', 'formatDate result 20190423')