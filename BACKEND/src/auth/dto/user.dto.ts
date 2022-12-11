import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Rule } from "src/models/user.model";



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
    @ApiPropertyOptional()
    company?: string;
    @ApiPropertyOptional()
    phone?: string;
    @ApiProperty({ enum: [Rule.USER, Rule.HOST, Rule.ADMIN] })
    rule: Rule;
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
    @ApiPropertyOptional()
    company?: string;
    @ApiPropertyOptional()
    phone?: string;
    @ApiProperty({ enum: [Rule.USER, Rule.HOST, Rule.ADMIN] })
    rule: Rule;
}

