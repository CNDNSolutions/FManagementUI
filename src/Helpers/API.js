import axios from "axios";
import moment from "moment";
import { toFormat } from "./Time";

export const byPeriod = (start, end) => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:8000/api/Entries?periodStart=" + toFormat(start) + "&periodEnd=" + toFormat(end))
            .then((response) => {
                resolve(response.data);
            })
            .catch((response) => {
                reject(response);
            });
    });
};
