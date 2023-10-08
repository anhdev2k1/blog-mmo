import moment from "moment";
const convertDateTime = (datetime: any) => {
  const momentUtc = moment.utc(datetime);
  const vietnamDate = momentUtc.utcOffset(420).format("DD/MM HH:mm:ss");
  return vietnamDate
};
export default convertDateTime