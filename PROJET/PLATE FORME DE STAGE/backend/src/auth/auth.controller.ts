import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService:AuthService){}

  @Post('register')

  async register(@Body() registerDto:RegisterDto){

    return this.authService.register(registerDto);
  
}
  
  @Post('login')

  async login(@Body() loginDto:LoginDto){
      
         return this.authService.login(loginDto);

  }

  @Post("forgot-password")
     async forgotPassword(@Body("email") email: string) {
     return this.authService.sendPasswordReset(email);
    }


   @Post("reset-password")
       async resetPassword(
       @Body("token") token: string,
       @Body("newPassword") newPassword: string
      ) {
        return this.authService.resetPassword(token, newPassword);
    } 

}
