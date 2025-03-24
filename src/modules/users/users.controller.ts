import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { usersServices } from "./users.servess";
import { signupDtos } from "./dtos/signup.dtos";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { sginindto } from "./dtos/signin.dtos";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";
@Controller("/users")
export class usersRoutes {
    constructor(private readonly usersService: usersServices,
        private readonly configService: ConfigService
    ) { }
    @Post('/signup')
    @ApiBody({ type: signupDtos })
    async Signup(@Body() dto: signupDtos) {
        return await this.usersService.Signup(dto)
    }

    @Post('/signin')
    @ApiBody({ type: sginindto })
    Signin(@Body() dto: sginindto) {
        return this.usersService.Signin(dto)
    }

    @ApiBearerAuth()
    @Get('/Profile')
    myProfile(@Req() req: Request) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("No token provided");
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET_KEY')!) as jwt.JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.email) {
            throw new UnauthorizedException("Invalid token");
        }

        return this.usersService.myProfile({ email: decoded.email });
    }
    @ApiBearerAuth()
    @Get('/other')
    async getOther(@Req() req: Request) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("No token provided");
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET_KEY')!) as jwt.JwtPayload;

        return await this.usersService.getOther({ email: decoded.email });

    }

}