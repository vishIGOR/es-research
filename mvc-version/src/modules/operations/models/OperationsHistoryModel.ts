import {ApiProperty} from "@nestjs/swagger";
import {OperationReadModel} from "./OperationReadModel";

export class OperationsHistoryModel {
    @ApiProperty()
    totalCount: number;
    @ApiProperty({type: [OperationReadModel]})
    operations: OperationReadModel[] = [];
}