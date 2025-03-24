import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { Teahersservess } from "./teachers.servess";
import { HttpExceptionFilter } from "src/fillters/http.exptions.filter";
import { Teachers } from "src/Schema/teachers.schema";
@Controller('/teachers')
export class TeachersController {
    constructor(private  teachersService: Teahersservess) {}

    @UseFilters(new HttpExceptionFilter())
    @Get()
    async getallteachers(): Promise<Teachers[]> {
        return this.teachersService.getallteachers();
    }

    @Get(':id')
    async getTeacherById(@Param('id') id: string): Promise<Teachers> {
        return this.teachersService.getTeacherById(id);
    }

    @Post()
    async addTeacher(@Body() teacherData: { name: string; age: number ;salary:number}): Promise<Teachers> {
        return this.teachersService.addTeacher(teacherData);
    }

    @Put(':id')
    async updateTeacher(@Param('id') id: string, @Body() updatedData: { name?: string; age?: number;salary?:number }): Promise<Teachers> {
        return this.teachersService.updateTeacher(id, updatedData);
    }

    @Delete(':id')
    async deleteTeacher(@Param('id') id: string): Promise<{ message: string; teacher: Teachers }> {
        return this.teachersService.deleteTeacher(id);
    }
}