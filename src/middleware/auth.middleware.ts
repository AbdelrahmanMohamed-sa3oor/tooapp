import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction } from "express";

@Injectable()

export class authMiddleWare implements NestMiddleware{
    constructor(private readonly configService:ConfigService){}
    use(req: Request, res: Response, next: NextFunction ) {
        // console.log(req.headers);
        const authKey=req.headers['auth']!;
        console.log(authKey);
        const AUTHKEY=this.configService.get<string>('AUTH_KEY')!;

        if(authKey !== AUTHKEY){
            throw new ForbiddenException("not allowed auth")
        }
        next();
    }
}