import moment from "moment";

export const startOfMonth = () => {
    return toFormat(moment().startOf("month"));
};

export const endOfMonth = () => {
    return toFormat(moment().endOf("month").startOf("day"));
};

export const startOfYear = () => {
    return toFormat(moment().startOf("year"));
};

export const endOfYear = () => {
    return toFormat(moment().endOf("year").startOf("day"));
};

export const toFormat = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
