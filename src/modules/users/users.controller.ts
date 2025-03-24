import { Controller, Get, Post } from "@nestjs/common";
import { usersServices } from "./users.servess";

@Controller("/users")
export class usersRoutes{
        constructor(private readonly usersService:usersServices){}
    @Post('/signup')
    Signup(){

    }

    @Get('/signin')
    Signin(){
        
    }

    @Get('/myprofile')
    myProfile(){

    }

    @Get('/other')
    getOther(){

    }

}