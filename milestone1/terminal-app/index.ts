import * as readline from "readline-sync";
import type { Driver } from "./interface";

const DRIVERS_URL = "https://raw.githubusercontent.com/YunusM4/WebontwikkelingData26-27/main/f1_racers.json";

function showDriverShort(driver: Driver): void {
    console.log(`- ${driver.name} (${driver.id})`);
}

function showDriverDetails(driver: Driver): void {
    showDriverShort(driver);
    console.log(`  - Description: ${driver.description}`);
    console.log(`  - Driver number: ${driver.driverNumber}`);
    console.log(`  - Active: ${driver.isActive}`);
    console.log(`  - Birthdate: ${driver.birthDate}`);
    console.log(`  - Image: ${driver.imageUrl}`);
    console.log(`  - Status: ${driver.status}`);
    console.log(`  - Skills: ${driver.skills.join(", ")}`);
    console.log(`  - Team: ${driver.team.name}`);
    console.log(`    - Id: ${driver.team.id}`);
    console.log(`    - Name: ${driver.team.name}`);
    console.log(`    - Country: ${driver.team.country}`);
    console.log(`    - Active: ${driver.team.isActive}`);
    console.log(`    - Image: ${driver.team.imageUrl}`);
}

async function main() {
    try {
        const response = await fetch(DRIVERS_URL);
        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        const drivers: Driver[] = await response.json();

        console.log("Welcome to the JSON data viewer!");

        let running = true;
        while (running) {
            console.log();
            console.log("1. View all data");
            console.log("2. Filter by ID");
            console.log("3. Exit");
            console.log();

            const choice: number = readline.questionInt("Please enter your choice: ");
            console.log();

            switch (choice) {
                case 1:
                    for (const driver of drivers) {
                        showDriverShort(driver);
                    }
                    break;
                case 2: {
                    const id: number = readline.questionInt("Please enter the ID you want to filter by: ");
                    console.log();
                    const driver: Driver | undefined = drivers.find((d) => d.id === id);
                    if (driver) {
                        showDriverDetails(driver);
                    } else {
                        console.log(`No driver found with ID ${id}.`);
                    }
                    break;
                }
                case 3:
                    console.log("Bay!");
                    running = false;
                    break;
                default:
                    console.log("Invalid choice, please enter 1, 2 or 3.");
            }
        }
    } catch (error: any) {
        console.log("Could not load the data:", error);
    }
}

main();