export default function convertStampDate(unixtimestamp) {
  var months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var date = new Date(unixtimestamp * 1000);

  var year = date.getFullYear();

  var month = months_arr[date.getMonth()];

  var day = date.getDate();

  var hours = date.getHours();

  var minutes = "0" + date.getMinutes();

  var seconds = "0" + date.getSeconds();

  var fulldate =
    month +
    " " +
    day +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  var convdataTime = month + " " + day;
  return convdataTime;
}
