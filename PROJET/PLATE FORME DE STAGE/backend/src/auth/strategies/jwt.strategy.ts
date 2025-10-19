import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigModule,ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
     
    constructor(){

      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "process.env.SECRET_KEY" as string,  
    });
 
    }

   extractPayload(token: string) {
  try {
    // Vérifie le token et retourne le payload
    const decoded = jwt.verify(token, "process.env.SECRET_KEY" as string);
    return decoded; // contient { sub, email, role, iat, exp }
  } catch (err) {
    throw new UnauthorizedException('Token invalide ou expiré');
  }
}

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
