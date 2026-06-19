import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

interface AuthPayload {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthPayload> {
    const { email, name, password } = signupDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
    });

    const userId = String(user._id);
    const accessToken = this.generateToken(userId, user.email);

    return {
      user: {
        id: userId,
        email: user.email,
        name: user.name,
      },
      accessToken,
    };
  }

  async signin(signinDto: SigninDto): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(signinDto.email);

    if (!user || !(await bcrypt.compare(signinDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = String(user._id);
    const accessToken = this.generateToken(userId, user.email);

    return {
      user: {
        id: userId,
        email: user.email,
        name: user.name,
      },
      accessToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
