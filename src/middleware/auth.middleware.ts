import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()

export class authMiddleWare implements NestMiddleware{
    constructor(private readonly configService:ConfigService){}
    use(req: Request, res: Response, next: NextFunction ) {
        console.log(req.headers);
        const authKey=req.headers['auth']!;
        console.log(authKey);
        const AUTHKEY=this.configService.get<string>('AUTH_KEY')!;

        if(authKey !== AUTHKEY){
            throw new ForbiddenException("not allowed auth")
        }    
        // const AuthorizationKey=req.headers['Authorization']!;
        // const [, token]=AuthorizationKey.split(' ')
        // const JWT_SECRET_KEY=this.configService.get<string>('JWT_SECRET_KEY')!;
        // const payload = jwt.verify(token,JWT_SECRET_KEY);
        // if (!payload) {
        //     throw new UnauthorizedException("error credentials")
        // }
        // console.log(payload);
        // req['user']=payload;
        next();
    }
}