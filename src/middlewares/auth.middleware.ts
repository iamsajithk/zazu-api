import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    let isValid = false;
    if (authToken != '' && authToken != null) {
      const tokenDetails = await this.authService.getTokenDetails({
        token: authToken,
      });
      if (tokenDetails != null) {
        req.user = tokenDetails.user_id;
        isValid = true;
      }
    }
    if (!isValid) {
      res.status(401).json({ status: 'ERROR', message: 'Unauthorized' });
    }
    next();
  }
}
