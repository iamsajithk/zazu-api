import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SignInDto } from 'src/dtos/sign-in.dto';
import { SignUpDto } from 'src/dtos/sign-up.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/api/auth/sign-up')
  async signUp(@Res() res: Response, @Body() params: SignUpDto): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      token: null,
    };
    const user = await this.authService.getUserByEmail(params.email);
    if (user) {
      response.message = 'User already exists.';
    } else {
      const hashedPassword = await this.authService.hashPassword(
        params.password,
      );
      const token = await this.authService.generateToken();
      const user = await this.authService.createUser({
        email: params.email,
        password: hashedPassword,
      });
      if (user) {
        const authToken = await this.authService.createToken({
          token: token,
          user_id: user.id,
        });
        if (authToken) {
          response.status = 'success';
          response.message = 'User created successfully.';
          response.token = token;
        } else {
          response.message = 'Token creation failed. Try sign in.';
        }
      } else {
        response.message = 'User creation failed.';
      }
    }
    res.status(200).json(response);
  }

  @Post('/api/auth/sign-in')
  async signIn(@Res() res: Response, @Body() params: SignInDto): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      token: null,
    };
    const user = await this.authService.getUserByEmail(params.email);
    if (user) {
      const match = await this.authService.comparePassword(
        params.password,
        user.password,
      );
      if (match) {
        const token = await this.authService.generateToken();
        const authToken = await this.authService.createToken({
          token: token,
          user_id: user.id,
        });
        if (authToken) {
          response.status = 'success';
          response.message = 'User signed in successfully.';
          response.token = token;
        } else {
          response.message = 'Token creation failed. Try sign in.';
        }
      } else {
        response.message = 'Password does not match.';
      }
    } else {
      response.message = 'User does not exist.';
    }
    res.status(200).json(response);
  }
}
