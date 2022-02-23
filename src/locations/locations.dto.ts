import { IsNotEmpty } from "class-validator";

/**
 * To declare properties required and to perform validations
 */
export class LocationsDTO{

    /**
     * To declare locationName
     */
    @IsNotEmpty({message:"Location must be specified"})
    locationName:string

}