import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from } from 'rxjs';

@Injectable()
export class EmailService {

    private transpoter;
    
    constructor(){
       this.transpoter=nodemailer.createTransport({
           service:'gmail',
           auth:{
                  user: process.env.MAIL_USER, 
                  pass: process.env.MAIL_PASS,
           },
       });
    }

    async sendMail(to:string, subject:string, html:string){
        this.transpoter.sendMail({
            from: `"Support ${process.env.PLATEFORME_NAME}" <${process.env.MAIL_USER}>`, 
            to,
            subject,
            html,

        });
    }

}
