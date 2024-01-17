import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
console.log(__dirname)
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'dist-frontend'),
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
