import * as logger from "econ-logger";
import Request from "../../lib/Request";
import { API_BASE_URL } from "../../config/Constants";

const getHDMFDeduction = async (monthlySalary: number) => {
    logger.info("Retrieving HDMF deduction...");

    const uri = API_BASE_URL.HDMF + "/api/v1/calculate";

    const options = {
        headers : {
            "Content-Type" : "application/json",
        },
    };

    const payload = JSON.stringify({
        salary: monthlySalary,
    });

    const data = await Request.post(uri, options, payload);

    return data.deduction;
};

export { getHDMFDeduction };
