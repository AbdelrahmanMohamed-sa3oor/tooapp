import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/users.schema';
import { usersServices } from './users.servess';
import { usersRoutes } from './users.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [usersRoutes],
  providers: [usersServices],
})
export class UserModule {}
