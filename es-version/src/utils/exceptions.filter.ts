import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from "@nestjs/common";
import {AppError} from "../errors/errors.base";

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        Logger.error(exception, "Inner exception");
        console.log(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof AppError) {
            response.status(exception.code).send({message: exception.message});
            return;
        }
        if (exception instanceof HttpException) {
            response.status((exception as HttpException).getStatus()).send((exception as HttpException).getResponse());
            return;
        }

        response.status(500).send({message: "Unexpected server error"});
    }

}