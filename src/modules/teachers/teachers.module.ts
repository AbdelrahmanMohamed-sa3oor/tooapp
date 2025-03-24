import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { Teahersservess } from './teachers.servess';
import { MongooseModule } from '@nestjs/mongoose';
import { Teachers, TeachersSchema } from 'src/Schema/teachers.schema';
import { authMiddleWare } from 'src/middleware/auth.middleware';


@Module({
    imports: [MongooseModule.forFeature([{ name: Teachers.name, schema:TeachersSchema }])],
    controllers:[TeachersController],
    providers:[Teahersservess],
    exports:[Teahersservess]    
})
export class teachersmodule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(authMiddleWare).forRoutes('teachers')
    }
}