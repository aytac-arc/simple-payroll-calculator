import * as logger from "econ-logger";
import Request from "../../lib/Request";
import { API_BASE_URL } from "../../config/Constants";

const getSSSDeduction = async (monthlySalary: number) => {
    logger.info("Retrieving SSS deduction...");

    const uri = API_BASE_URL.SSS + "/calculate";

    const options = {
        headers : {
            "Content-Type" : "application/json",
        },
    };

    const payload = JSON.stringify({
        salary: this.monthlySalary,
    });

    const data = await Request.post(uri, options, payload);

    return data.deduction;
};

export { getSSSDeduction };
