import { Injectable } from "@nestjs/common";
import { Teahersservess } from "../teachers/teachers.servess";
import { InjectModel } from "@nestjs/mongoose";
import { schools } from "src/Schema/schools.schema";
import { Model } from "mongoose";
import { Teachers } from "src/Schema/teachers.schema";

@Injectable()
export class schoolsServess{
    constructor(
        private readonly teachersService:Teahersservess,
        @InjectModel(schools.name) private readonly schoolModule:Model<schools> 
    ){}


       async getAllSchools(): Promise<schools[]> {
        return this.schoolModule.find({}).populate('teachers').exec();
       }

      async addSchools(createSchoolsDto: { name: string; locations: number; teachers:Teachers[]}): Promise<schools> {
            const newschools = new this.schoolModule(createSchoolsDto);
            return newschools.save();
        }
        async getSchoolsAnalytics(): Promise<{ mostTeachers: schools | null; leastTeachers: schools | null} | {message:string}> {
            const aggregationResult = await this.schoolModule.aggregate([
                {
                    $project: {
                        name: 1,
                        teachersCount: { $size: "$teachers" }
                    }
                },
                {
                    $match: { teachersCount: { $gt: 0 } } // سيب المدارس اللي اقل من صفر
                },
                {
                    $sort: { teachersCount: 1 } // ترتيب المدرسة تصاعديا
                }
            ]);
        
            if (aggregationResult.length === 0) {
                return { message: "No teachers found" }; 
            }
        
            const leastTeachers = aggregationResult[0]; // اقل مدرسة تحتوي ع مدرسين
            const mostTeachers = aggregationResult[aggregationResult.length - 1]; // اكبر مدرسة فيها مدرسين 
        
            return { mostTeachers, leastTeachers };
        }
    }