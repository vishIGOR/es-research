// import fetch from "node-fetch";
import * as fs from "fs";

// export async function pruneDataInEventStore() {
//     await fetch("http://localhost:2113/admin/scavenge",
//         {
//             method: "POST",
//             headers: {
//                 "Authorization": "Basic " + Buffer.from(`admin:changeIt`).toString("base64")
//             }
//         });
// }

export interface TableObject {
    [key: string]: any;
}

export interface SpeedTestTableObject extends TableObject {
    testName: string;
    amountOfData: string;
    executionTime: number;
}

export function addTableToFile(data: TableObject[], tableName: string, filePath: string): void {
    if (data.length === 0) {
        return;
    }

    const columnNames = Object.keys(data[0]);
    const rows = data.map(obj => columnNames.map(column => obj[column]));

    const table = [columnNames, ...rows];
    const tableText = table.map(row => row.join("\t")).join("\n");

    const tableSection = `\n\n${tableName}\n${tableText}`;

    fs.appendFileSync(filePath, tableSection, { encoding: "utf-8" });
}

export function measureExecutionTime(fn: (...args: any[]) => any) {
    return async function (params: any[]): Promise<number> {
        const startTime = Date.now();
        const result = await fn(...params);
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        console.log(`The function executed in ${executionTime} milliseconds.`);
        return executionTime;
    };
}
