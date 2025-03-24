import { Body, Controller, Get, Post } from "@nestjs/common";
import { schoolsServess } from "./schools.servsess";
import { Teachers } from "src/Schema/teachers.schema";
import { schools } from "src/Schema/schools.schema";

@Controller('/schools')
export class schoolscontroller{
    constructor(private readonly schools:schoolsServess){}
    @Get()
    getallSchooles(){
        return this.schools.getAllSchools()
    }
    @Post()
    addSchools(@Body() schools: { name: string; locations: number; teachers:Teachers[]}): Promise<schools>{
        return this.schools.addSchools(schools)
    }
    @Get('/analytics')
    async getSchoolsAnalytics() {
        return this.schools.getSchoolsAnalytics();
    }
}