import { Module } from "@nestjs/common";
import { schoolscontroller } from "./schools.controller";
import { schoolsServess } from "./schools.servsess";
import { schools, schoolsSchema } from "src/Schema/schools.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { teachersmodule } from "../teachers/teachers.module";

@Module({
    imports: [
        teachersmodule,
        MongooseModule.forFeature([{ name: schools.name, schema:schoolsSchema }])],
    controllers:[schoolscontroller],
    providers:[schoolsServess]
})
export class SchoolsModule{}    