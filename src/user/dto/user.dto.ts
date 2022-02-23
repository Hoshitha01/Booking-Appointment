import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/**
 * To declare  propertities for user and to perform validations
 */
export class UserDTO {

    /**
     * To declare name 
     */
    @IsNotEmpty({ message: 'name should not be empty' })
    @Length(3, 8, {
        message:
            'name should be minimum of 3 characters and maximum of 8 characters ',
    })
    name: string;

    /**
     * To declare emailId 
     */
    @IsNotEmpty({ message: 'emailId should not be empty' })
    @IsEmail()
    emailId: string;

    /**
     * To declare password 
     */
    @IsNotEmpty({ message: 'password should not be empty' })
    @Length(4, 8, {
        message: 'Lenght of password should be minimum of 4 and maximum of 8',
    })
    password: string;


    /**
     * To declare phonenumber 
     */
    @IsNotEmpty({ message: 'phonenumber should not be empty' })
    @Length(10, 11, {
        message: 'Lenght of phonenumber should be minimum of 10 and maximum of 11',
    })
    phoneNumber: string;

    @IsNotEmpty()
    age:number

    @IsNotEmpty()
    SSNNumber:string

}
