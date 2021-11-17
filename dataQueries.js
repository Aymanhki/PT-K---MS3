function getTransactionsInDay (data, year, month, day) {
    let transactionInMonth = getTransactionsInMonth(data, year, month);

    let result = [];

    //TODO: (Optional) improve searching method later if have time
    for (let transaction in transactionInMonth) {
        if (transaction.day == day) {
            result.push(transaction);
        }
    }

    return result;}

function getTransactionsInMonth (data, year, month) {
    let transactionInYear = getTransactionsInYear(data, year);

    let result = [];

    //TODO: (Optional) improve searching method later if have time
    for (let transaction in transactionInYear) {
        if (transaction.month == month) {
            result.push(transaction);
        }
    }

    return result;
}

function getTransactionsInYear (data, year) {
    let result = [];

    //TODO: (Optional) improve searching method later if have time
    for (let transaction in data) {
        if (transaction.year == year) {
            result.push(transaction);
        }
    }

    return result;
}

function getCategories (category) {
    
}

function getTransactionsInCategories (category, year, month, date) {

}

function addCategory (name, notes) {
    let newCategory = {
        name,
        notes
    }

    categories.push(newCategory)
}

function addTransaction (Title, Day, Month, Year, Category, IncomeOrExpense, Amount) {
    let newTransaction = {
        Title,
        Day,
        Month,
        Year,
        Category,
        'Income' : {
           'Expense': IncomeOrExpense
        },
        Amount
    }

    data.append(newTransaction)
}