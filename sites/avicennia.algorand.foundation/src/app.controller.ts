import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  // @Get()
  // @Render('Index')
  // public index() {
  //   // initial props
  //   return {
  //     title: 'Amazing NextJS',
  //   };
  // }
}
