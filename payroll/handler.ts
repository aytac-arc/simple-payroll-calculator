import { Callback, Context, Handler} from "aws-lambda";
import { getHDMFDeduction } from "./deduction/HDMFDeduction";
import { getSSSDeduction } from "./deduction/SSSDeduction";
import { responseCallback } from "../lib/CallbackUtil";
import * as logger from "econ-logger";

const processPayroll = async (monthlySalary: number) => {
    logger.info("Processing payroll...");

    const deductions = await getDeductions(monthlySalary);
    logger.info({message: "Total Deductions: ", deductions});

    const netPay = calculateNetPay(monthlySalary, deductions);

    return new Promise( (resolve, reject) => {
        resolve({
            deductions,
            grossPay: monthlySalary,
            netPay,
        });
    });
};

const getDeductions = async (monthlySalary: number) => {
    logger.info("Retrieving deductions...");

    const sssDeduction = await getSSSDeduction(monthlySalary);
    logger.info({message: "SSS Deduction: ", sssDeduction});

    const hdmfDeduction = await getHDMFDeduction(monthlySalary);
    logger.info({message: "HDMF Deduction: ", hdmfDeduction});

    return {
        hdmf: hdmfDeduction,
        sss: sssDeduction,
        total: sssDeduction + hdmfDeduction,
    };
};

const calculateNetPay = (monthlySalary: number, deductions: any) => {
    logger.info("Calculating net pay...");

    const netPay = monthlySalary - deductions.total;
    logger.info({message: "Net Pay: ", netPay});

    return netPay;
};

const payroll: Handler = async (event: any, context: Context, callback: Callback) => {
    logger.info({message: "Incoming event", event});

    try {
        const body = JSON.parse(event.body);
        const salary = body.salary;

        const data = await processPayroll(salary);

        if (data) {
            logger.info({message: "Returning data", data});

            responseCallback(callback, 200, data);
        } else {
            throw new Error("Unable to process payroll");
        }
    } catch (err) {
        logger.error({message: "Received error", error: err.message});
        responseCallback(callback, 500, err.message || "Internal Server Error");
    }
};

export { payroll };
