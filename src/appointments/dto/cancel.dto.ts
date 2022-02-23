import { IsNotEmpty } from "class-validator";

export class CancelDTO{
    @IsNotEmpty()
    reason:string;
}