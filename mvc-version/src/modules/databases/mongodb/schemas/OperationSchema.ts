import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class Operation {
	_id: Types.ObjectId;
	@Prop({ type: String, required: true })
	callerId: string;
	@Prop({ type: Date, default: new Date() })
	date: Date = new Date();
	@Prop({ type: String, required: true })
	type: string;
	@Prop({ type: [Types.ObjectId], default: [] })
	targetAccountIds: Types.ObjectId[] = [];
	@Prop({ type: Object, required: true, default: {} })
	payload: object = {};
}

export type OperationDocument = HydratedDocument<Operation>;
export const OperationSchema = SchemaFactory.createForClass(Operation);