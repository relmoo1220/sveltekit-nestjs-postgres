import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './file-uploader/entities/file-uploader.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    FileUploaderModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'sqlite' etc.
      host: 'postgres-db',
      port: 5432, // replace with your DB port
      username: 'postgres',
      password: '1234',
      database: 'mydb',
      entities: [Post], // your entities here
      synchronize: true, // Automatically sync entity schema with DB (disable in production)
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
