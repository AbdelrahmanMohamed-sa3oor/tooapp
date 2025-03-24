import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Teachers } from "src/Schema/teachers.schema";

@Injectable()
export class Teahersservess{
    constructor(@InjectModel(Teachers.name) private TeacherModel: Model<Teachers>) {}
    

    //mongoos
    getallteachers(){
        return this.TeacherModel.find({})
    }

    async getTeacherById(id: string): Promise<Teachers> {
        const teacher = await this.TeacherModel.findById(id);
        if (!teacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
        return teacher;
    }

    async addTeacher(createTeacherDto: { name: string; age: number;salary:number }): Promise<Teachers> {
        const newTeacher = await new this.TeacherModel(createTeacherDto);
        return newTeacher.save();
    }

    async updateTeacher(id: string, updateTeacherDto: { name?: string; age?: number;salary?:number  }): Promise<Teachers> {
        const updatedTeacher = await this.TeacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true })
        if (!updatedTeacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
        return updatedTeacher;
    }

    async deleteTeacher(id: string): Promise<{ message: string; teacher: Teachers }> {
        const deletedTeacher = await this.TeacherModel.findByIdAndDelete(id)
        if (!deletedTeacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
        return { message: `Teacher with ID ${id} deleted successfully`, teacher: deletedTeacher };
    }
}