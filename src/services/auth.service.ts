import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, AuthToken } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getTokenDetails(
    where: Prisma.AuthTokenWhereInput,
  ): Promise<AuthToken | null> {
    return this.prisma.authToken.findFirst({
      where: where,
    });
  }
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async comparePassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, currentPassword);
    if (match) {
      return true;
    } else {
      return false;
    }
  }
  async generateToken(): Promise<string> {
    let isValidToken = false;
    let validToken = '';
    while (!isValidToken) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenDetails = await this.isTokenExists({
        token: token,
      });
      if (!tokenDetails) {
        validToken = token;
        isValidToken = true;
      }
    }
    return validToken;
  }
  async isTokenExists(where: Prisma.AuthTokenWhereInput): Promise<any | null> {
    return this.prisma.authToken.findFirst({
      where: where,
    });
  }
  async createToken(
    data: Prisma.AuthTokenUncheckedCreateInput,
  ): Promise<AuthToken> {
    return this.prisma.authToken.create({
      data,
    });
  }
}
