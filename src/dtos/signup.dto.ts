import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignUpDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string;

  @IsNotEmpty({ message: "Username is required" })
  @MaxLength(50, { message: "Username must be less than 50 character" })
  username: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 character" })
  @MaxLength(255, { message: "Password must be less than 255 character" })
  password: string;
}
