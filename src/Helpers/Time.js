import moment from "moment";

export const startOfMonth = () => {
    return moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
};

export const endOfMonth = () => {
    return moment().endOf("month").startOf("day").format("YYYY-MM-DD HH:mm:ss");
};
