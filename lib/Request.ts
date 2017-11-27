import * as WebRequest from "web-request";
import * as logger from "econ-logger";

class Request {

    public static async get() {
        logger.info("Not yet supported");
    }

    public static async post(uri: string, options?: WebRequest.RequestOptions, content?: any) {
        const response =  await WebRequest.post(uri, options, content);
        logger.info({message: "Response: ", response});

        const parsedData = JSON.parse(response.content);
        logger.info({message: "Parsed Response: ", parsedData});

        return parsedData;
    }

    public static async put() {
        logger.info("Not yet supported");
    }

    public static async delete() {
        logger.info("Not yet supported");
    }

}

export default Request;
