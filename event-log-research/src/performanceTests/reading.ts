import { addTableToFile, measureExecutionTime, SpeedTestTableObject, TableObject } from "./helpers";
import { EventStore } from "../eventStore/EventStore";

async function startTests() {
    let tableObjects: TableObject[] = [];

    tableObjects = tableObjects.concat(await readEventsFromStore(
        [1, 10, 100, 1000, 5000, 10000, 50000]
    ));
    addTableToFile(tableObjects, "Reading tests " + (new Date()).toISOString(), "./testsResults.txt");
}

async function readEventsFromStore(numberOfEvents: number[]): Promise<SpeedTestTableObject[]> {
    const testName = "readEventsFromStore";

    const test = async (number) => {
        const events = await EventStore.getInstance().get("batch-stream", {
            maxCount: number
        });
    };

    const tableObjects: SpeedTestTableObject[] = [];
    let counter = 0;
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
        counter++;
    }

    return tableObjects;
}

startTests().then(r => {
});
