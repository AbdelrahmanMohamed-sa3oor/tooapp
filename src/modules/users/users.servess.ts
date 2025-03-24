import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Schema/users.schema";
import { signupDtos } from "./dtos/signup.dtos";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { sginindto } from "./dtos/signin.dtos";
import { ConfigService } from "@nestjs/config";
import { MESSAGES } from "@nestjs/core/constants";

@Injectable()
export class usersServices {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly configService:ConfigService
    ) {}

    async Signup(dto: signupDtos) {
        const { email, Password, age, fullName, mobileNumber } = dto;

        let existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException("Email already exists");
        }

        let existingMobile = await this.userModel.findOne({ mobileNumber });
        if (existingMobile) {
            throw new ConflictException("Mobile number already exists");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new this.userModel({
            email,
            Password: hashedPassword,  
            age,
            fullName,
            mobileNumber
        });

        await newUser.save();

        return newUser; 
    }


    async Signin(dto:sginindto){
        const {email,Password}=dto;
        const login=await this.userModel.findOne({email})

        if (!login) {
            throw new UnauthorizedException("invalids Email or password")
        }
        const ispassword =await bcrypt.compare(Password,login.Password);

        if (!ispassword) {
            throw new UnauthorizedException("invalids Email or password")
        }

        const payload={
            email:login.email
        }

        const token= jwt.sign(payload, this.configService.get<string>('JWT_SECRET_KEY')!)

        return{
            token 
        }
    }

   async myProfile(user:{email:string}){
    const usr = await this.userModel.findOne({ email: user.email }).select('email');

    if (!usr) {
        throw new UnauthorizedException("User does not exist");
    }

    return {
        email: usr.email,
        message: `Welcome ${usr.email}`
    };
    }

    async getOther(user: { email: string }) {
        const usr = await this.userModel.findOne({ email: user.email }).select('email');
        if (!usr) {
            throw new UnauthorizedException("User does not exist");
        }
    
        const otherUsers = await this.userModel.find({ email: { $ne: user.email } }).select('-Password');
    
        return {
            count: otherUsers.length,
            users: otherUsers
        };
    }

}
