import axios from "axios";
import moment from "moment";
import { toFormat } from "./Time";
import { DEFAULT_HEADERS, ENTRIES_URL } from "@/Config/API";

export const byPeriod = (start, end) => {
    return new Promise((resolve, reject) => {
        axios
            .get(ENTRIES_URL + "?periodStart=" + toFormat(start) + "&periodEnd=" + toFormat(end), { headers: DEFAULT_HEADERS })
            .then((response) => {
                resolve(response.data);
            })
            .catch((response) => {
                console.log(response);
                reject(response);
            });
    });
};
