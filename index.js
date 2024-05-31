#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magentaBright.bold.italic("WELCOME TO BANK APPLICATION..."));
console.log(chalk.whiteBright("Here are some demo account numbers which you can access:"));
let demoAccounts = [1001, 1002, 1003, 1004, 1005];
demoAccounts.forEach(demo => {
    console.log(demo);
});
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber,
            this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright(`You have successfully withdraw amount $${amount}, your remaining balance is: $${this.balance}`));
        }
        else {
            console.log(chalk.redBright(`Insufficient Balance.`));
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if the amount is greater than $100 
        }
        this.balance += amount;
        console.log(chalk.blueBright(`You have successfully deposited the amount $${amount}, After deduction of $1 fee charges, Your new balance is: $${this.balance}`));
    }
    //check Balance:
    checkBalance() {
        console.log(chalk.cyanBright(`Your Account Balance is $${this.balance}`));
    }
}
// customer class
class Customer {
    firstName;
    lastName;
    gendre;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gendre, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gendre = gendre;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts:
const accounts = [
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000),
    new BankAccount(1003, 3000),
    new BankAccount(1004, 4000),
    new BankAccount(1005, 5000),
];
const customers = [
    new Customer("Farhan", "Khan", "Male", 23, 123456789, accounts[0]),
    new Customer("Hamza", "Khan", "Male", 25, 12734678, accounts[1]),
    new Customer("Fareed", "Khan", "Male", 27, 453357789, accounts[2]),
    new Customer("Bilal", "Khan", "Male", 29, 43576889, accounts[3]),
    new Customer("Faraz", "Khan", "Male", 31, 54656867, accounts[4])
];
// function to interact with bank account:
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.redBright("Enter your account number?")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.cyanBright(`Welcome ${customer.firstName} ${customer.lastName}!`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: chalk.yellowBright("Kindly select one of the choice."),
                    choices: ["Deposit Amount", "Withdraw Amount", "check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit Amount":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("kindly write amount which you want to deposit.")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw Amount":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("kindly write amount which you want to withdraw.")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.cyanBright.bold.italic("Exiting Bank Program..."));
                    console.log(chalk.magentaBright.bold.italic("Thankyou for using Bank Application \nHave a Good Day!"));
                    return;
            }
        }
        else {
            console.log(chalk.redBright("Invalid Account Number... Please Try Again..."));
        }
    } while (true);
}
service();
