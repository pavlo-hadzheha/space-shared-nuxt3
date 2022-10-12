import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class RegisterDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}


export class UserResponse {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}

