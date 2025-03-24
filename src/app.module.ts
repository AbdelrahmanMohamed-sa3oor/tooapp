import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { teachersmodule } from './modules/teachers/teachers.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    teachersmodule,
    SchoolsModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal:true
    }), 
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (ConfigService:ConfigService)=>{
        const uri=ConfigService.get<string>('MONGO_DB_CONNECTION_STRING');
        console.log({uri});
        return {
          uri,
        };
      },
    }
    ),
    ConfigModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('teachers');
    consumer.apply(LoggerMiddleware).forRoutes('/users/Profile');
  }
}
// export class AppModule {}  
