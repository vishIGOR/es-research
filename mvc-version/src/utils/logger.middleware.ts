import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(request: any, response: any, next: (error?: any) => void): any {
        const { ip, method, path: url } = request;
        const userAgent = request.get('user-agent') || '';
        Logger.log(`${method} ${url} - ${userAgent} ${ip}`, "HTTP Request");

        const startTime = Date.now();
        response.on('close', () => {
            const { statusCode } = response;
            Logger.log(`${method} ${url} - ${statusCode} - ${Date.now() - startTime}ms`, "HTTP Response");
        });

        next();
    }

}