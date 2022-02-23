import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

/**
 * To commint any changes in request data or response data
 */
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("in interceptor");
        let statusCode=context.switchToHttp().getResponse().statusCode;
        let response=next.handle().pipe(map(data=>{
            return {
                 data,//data:data
                 statusCode
            }
        }))
        //throw new Error("Method not implemented.");
        return response;
    }
}