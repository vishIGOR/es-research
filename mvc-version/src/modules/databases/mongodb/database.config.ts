export class DatabaseConfigService {
    public async getMongoConfig() {
        const options = ["REPLICASET", "AUTHMECHANISM", "AUTHSOURCE", "DIRECTCONNECTION"];
        return {
            uri: this.getCoreConnectionAddressFromEnv() + this.getConnectionOptionsFromEnv(options),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }

    private getCoreConnectionAddressFromEnv() {
        return "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST
            + "/" + process.env.MONGO_DATABASE + "?";
    }

    private getConnectionOptionsFromEnv(options) {
        let resultString = "";
        for (const option of options) {
            resultString += this.getSingleOptionFromEnv(option);
        }
        return resultString;
    }

    private getSingleOptionFromEnv(option: string) {
        if (process.env[option]) return `${option}=${process.env[option]}&`;
        return "";
    }
}