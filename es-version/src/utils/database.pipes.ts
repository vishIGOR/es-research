import {ArgumentMetadata, Injectable, PipeTransform,} from "@nestjs/common";
import {Types} from "mongoose";
import {ValidationError} from "../errors/errors";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): any {
        if (!Types.ObjectId.isValid(value))
            throw new ValidationError("Path parameter 'id' is not valid mongodb id");

        return value;
    }

}