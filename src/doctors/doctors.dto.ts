import { IsNotEmpty } from "class-validator"
/**
 * To declare required properties
 */
export class DoctorsDTO{

    /**
     * To declare doctor name
     */
    @IsNotEmpty()
    doctorName:string

    /**
     *  To declare doctor name
     */
    @IsNotEmpty()
    password:string

    /**
     *  To declare specilization
     */
    @IsNotEmpty()
    specialization:string

    /**
     *  To declare consultationFee
     */
    @IsNotEmpty()
    consultationFee:number

    /**
     *  To declare experience
     */
    @IsNotEmpty()
    experience:number

    /**
     *  To declare rating
     */
    @IsNotEmpty()
    rating:number

    /**
     *  To declare qualification
     */
    @IsNotEmpty()
    qualification:string

}