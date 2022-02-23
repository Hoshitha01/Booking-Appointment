import { IsNotEmpty } from "class-validator"

/**
 * To declare the required properties
 */
export class SlotsDTO{

/**
 * Date should be mentioned
 */
@IsNotEmpty({message:"date should be mentioned"})
date:string

/**
 * start time should be mentioned
 */
@IsNotEmpty({message:"date should be mentioned"})
startTime:string

/**
 * end time should be mentioned
 */
@IsNotEmpty({message:"date should be mentioned"})
endTime:string

/**
 * status should be mentioned
 */
@IsNotEmpty()
status :string

}