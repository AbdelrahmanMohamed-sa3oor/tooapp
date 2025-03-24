import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, isString, Max, Min, MinLength } from "class-validator";
import { authdto } from "./auth.dtos";

export class signupDtos extends authdto{
    @ApiProperty()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobileNumber: string;

    @ApiProperty()
    @Min(16,{message:"most be 16 age"})
    @Max(60)
    @IsNotEmpty()
    @IsNumber()
    age: number;
}