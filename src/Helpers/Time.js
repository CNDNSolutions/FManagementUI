import moment from "moment";

export const startOfMonth = () => {
    return toFormat(moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"));
};

export const endOfMonth = () => {
    return toFormat(moment().endOf("month").startOf("day"));
};

export const toFormat = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
