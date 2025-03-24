import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";

export class authdto{
     @ApiProperty()
        @IsNotEmpty()
        @IsEmail()
        email:string;
    
        @ApiProperty()
        @IsNotEmpty()
        @MinLength(8)
        @IsAlphanumeric()
        Password:string;
    
        
    
}