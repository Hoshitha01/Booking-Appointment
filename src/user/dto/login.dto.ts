import { IsEmail, IsNotEmpty } from 'class-validator';
/**
 * To declare properties for login
 */
export class LoginDTO {

    /**
     * To declare emailId
     */
    @IsNotEmpty({ message: 'email should not be empty' })
    @IsEmail({ message: 'enter valid email id' })
    emailId: string;

    /**
     * To declare password
     */
    @IsNotEmpty({ message: 'password should not be empty' })
    password: string;
}
