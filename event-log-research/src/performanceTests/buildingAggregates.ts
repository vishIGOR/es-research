import { AccountAggregate } from "../aggregates/AccountAggregate";
import { ClientAggregate } from "../aggregates/ClientAggregate";
import { addTableToFile, measureExecutionTime, SpeedTestTableObject, TableObject } from "./helpers";

async function startTests() {
    let tableObjects: TableObject[] = [];

    tableObjects = tableObjects.concat(await buildingAggregateWithoutSnapshots(
        [1, 10, 100, 1000, 5000, 10000, 50000]
    ));
    addTableToFile(tableObjects, "Tests", "./testsResults.txt");
}

async function buildingAggregateWithoutSnapshots(numberOfEvents: number[]): Promise<SpeedTestTableObject[]> {
    const testName = "buildingAggregateWithoutSnapshots";

    const client = await ClientAggregate.registerClient({
        name: "Gabriel"
    });

    const accountIds = [];
    const promises = [];
    for (const currentNumber of numberOfEvents) {
        const account = await AccountAggregate.openAccount({
            clientId: client.id
        });
        for (let i = 0; i < currentNumber; i++) {
            promises.push(account.depositMoney({ clientId: client.id, amountOfMoney: 10 }));
        }
        console.log(`created ${currentNumber} events for account ${account.id}`);
        accountIds.push(account.id);
    }
    await Promise.all(promises);
    const test = async (id) => {
        const account = await AccountAggregate.get(id);
    };

    const tableObjects: SpeedTestTableObject[] = [];
    let counter = 0;
    for (const number of numberOfEvents) {
        const numberOfIterations = 3;
        let timeSum = 0;
        for (let i = 0; i < numberOfIterations; i++) {
            timeSum += await measureExecutionTime(test)([accountIds[counter]]);
        }
        tableObjects.push({
            testName,
            amountOfData: `${number} events`,
            executionTime: timeSum / numberOfIterations
        });
        console.log(`timeSum: ${timeSum}, numberOfIterations: ${numberOfIterations}`);
        counter++;
    }

    return tableObjects;
}


startTests().then(r => {
});
