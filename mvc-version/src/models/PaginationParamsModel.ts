import {IsInt, IsOptional, IsPositive} from "class-validator";
import {Type} from "class-transformer";

export class PaginationParamsModel {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    limit: number
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    skip: number
}