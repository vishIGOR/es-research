import {Module} from "@nestjs/common";
import {AccountsController} from "../controllers/accounts.controller";

@Module({
    providers: [],
    controllers: [AccountsController],
    exports: [],
    imports: []
})
export class AccountsModule {
}