import axios from "axios";
import moment from "moment";
export const byPeriod = (start, end) => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:8000/api/Entries?periodStart=" + moment(start).format("YYYY-MM-DD HH:mm:ss") + "&periodEnd=" + moment(end).format("YYYY-MM-DD HH:mm:ss"))
            .then((response) => {
                resolve(response.data);
            })
            .catch((response) => {
                reject(response);
            });
    });
};
