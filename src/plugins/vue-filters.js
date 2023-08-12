import Vue from "vue";
import moment from "moment";

Vue.filter("localMoment", function (date, format) {
  return moment.utc(date).local().format(format);
});
