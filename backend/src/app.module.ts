import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { Upload } from './upload/entities/upload.entity';

@Module({
  imports: [
    UploadModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'sqlite' etc.
      host: 'postgres-db',
      port: 5432, // replace with your DB port
      username: 'postgres',
      password: '1234',
      database: 'mydb',
      entities: [Upload], // your entities here
      synchronize: true, // Automatically sync entity schema with DB (disable in production)
      autoLoadEntities: true,
    }),
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
