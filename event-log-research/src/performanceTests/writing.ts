import { AccountAggregate } from "../aggregates/AccountAggregate";
import { ClientAggregate } from "../aggregates/ClientAggregate";
import { addTableToFile, measureExecutionTime, SpeedTestTableObject, TableObject } from "./helpers";

async function startTests() {
    let tableObjects: TableObject[] = [];

    // tableObjects = tableObjects.concat(await writeSyncWithRebuildingAggregateForSmallEvent(
    //     [1, 10, 100, 1000, 5000, 10000]
    // ));


    tableObjects = tableObjects.concat(await writeSyncWithRebuildingAggregateForSmallEvent(
        [1, 10, 100, 1000, 5000, 10000]
    ));
    addTableToFile(tableObjects, "Writing tests " + (new Date()).toISOString(), "./testsResults.txt");
}

async function writeSyncWithoutRebuildingAggregate(numberOfEvents: number) {

}

async function writeAsyncWithoutRebuildingAggregate(numberOfEvents: number) {
    console.log("TEST writeAsyncWithRebuildingAggregate");
}

async function writeSyncWithRebuildingAggregate(numberOfEvents: number) {
    console.log("TEST writeAsyncWithRebuildingAggregate");
}

async function writeSyncWithRebuildingAggregateForSmallEvent(numberOfEvents: number[]): Promise<SpeedTestTableObject[]> {
    const testName = "writeSyncWithRebuildingAggregateForSmallEvent";

    const client = await ClientAggregate.registerClient({
        name: "Gabriel"
    });
    const test = async (numberOfIterations) => {
        const account = await AccountAggregate.openAccount({
            clientId: client.id
        });

        for (let i = 0; i < numberOfIterations; i++) {
            await account.depositMoney({ clientId: client.id, amountOfMoney: 10 });
        }
    };

    const tableObjects: SpeedTestTableObject[] = [];
    for (const number of numberOfEvents) {
        const numberOfIterations = 3;
        let timeSum = 0;
        for (let i = 0; i < numberOfIterations; i++) {
            timeSum += await measureExecutionTime(test)([number]);
        }
        tableObjects.push({
            testName,
            amountOfData: `${number} events`,
            executionTime: timeSum / numberOfIterations
        });
        console.log(`timeSum: ${timeSum}, numberOfIterations: ${numberOfIterations}`);
    }

    return tableObjects;
}



async function writeAsyncWithRebuildingAggregateForSmallEvent(numberOfEvents: number[]): Promise<SpeedTestTableObject[]> {
    const testName = "writeAsyncWithRebuildingAggregateForSmallEvent";

    const client = await ClientAggregate.registerClient({
        name: "Gabriel"
    });
    const test = async (numberOfIterations) => {
        const account = await AccountAggregate.openAccount({
            clientId: client.id
        });

        const promises = [];
        for (let i = 0; i < numberOfIterations; i++) {
            promises.push(account.depositMoney({ clientId: client.id, amountOfMoney: 10 }));
        }

        await Promise.all(promises);
    };

    const tableObjects: SpeedTestTableObject[] = [];
    for (const number of numberOfEvents) {
        const numberOfIterations = 3;
        let timeSum = 0;
        for (let i = 0; i < numberOfIterations; i++) {
            timeSum += await measureExecutionTime(test)([number]);
        }
        tableObjects.push({
            testName,
            amountOfData: `${number} events`,
            executionTime: timeSum / numberOfIterations
        });
        console.log(`timeSum: ${timeSum}, numberOfIterations: ${numberOfIterations}`);
    }

    return tableObjects;
}

startTests().then(r => {
});
