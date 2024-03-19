let dayjs = require("dayjs");

const formatUtcString = function (utcTime, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(utcTime).format(format);
};
module.exports = formatUtcString;
