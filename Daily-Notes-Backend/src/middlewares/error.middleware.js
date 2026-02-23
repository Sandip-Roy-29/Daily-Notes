import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError){
        return res
        .status(err.statusCode)
        .json(
            {
                success: false,
                message: err.message,
                errors: err.errors || [],
            }
        )
    }
    let response;
    if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === development){
        response = {
            success: false,
            message: err.message,
        }
    }else{
        response = {
            success: false,
            message: "Internal Server Error"
        }
    }

    return res
    .status(500)
    .json(response)
}

export default errorHandler;