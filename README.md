# Motivation

To show the coding abilities to the interviewer that I could implement the code with well formed structure. This project is to show the portfolio of the token/coins with current exchange rate by rereferring the file which used to record transactions over a period of times.

# Design Principles

In this projects, I followed the some of SOLID design principles. Those are 

1. Single Responsibility Principle
2. Open-Closed Principle
3.  Interface Segregation Principle



##### Single Responsibility Principle, 

According to `Single Responsibility Principle`, I implement the `model` with their own concern. For example:

In `tokens.model.ts` we have`outputTokenList` functions that only responsible for produce out put to end user depending on the `Token` Information.

##### Open-Closed Principle,

According to `Open-Closed Principle`, I implement the relationship between `filter` and `specification`. You can easily extend new `specification` according to domain requirement by implementing new `specification`.

You don't need modify the existing specification for new domain logic.

For example, Currently we do have two domain requirements, those are filter the transactions by date or/and token unit.

Soon or later, if we would like to filter the transactions with `amount`, we could just implement new `specification` for `amount` without modify existing logic.

 **Interface Segregation Principle**

The Interface Segregation Principle (ISP) states that **a client should not be exposed to methods it doesn’t need**. Declaring methods in an interface that the client doesn’t need pollutes the interface and leads to a “bulky” or “fat” interface.

So, In this project I used `ISpecification` interface to pass that instance between `filter` and `Specification` classess.



# Architecture(Design decisions)

In this project, there are four main logic concerns are based. Those are

1) **Specification**: `Specification` is used to filter the transaction by using constraint like by `date` or `token name`.
2) **Model**: `Model` is used to represent the CSV data model and Table model which display on console.
3) **Service**: `Service` is business logic service that contains `TransactionsFilter`,  `Calculation` and `HTTPService`.
4) **Utilities** : `Utilities` is a kinds of tools module, but in this project there only one concern to read the data from file.



##### **Main Controller**

I used `Controller -> Service -> Model` pattern in this project. In this project there are only one controller that is `main` controller.

The responsibilities of `main` controller is to prepare the CLI configuration and to call the appropriate service at appropriate time.

**Prepare CLI configuration**

![image-20220703200104096](.\img\image-20220703200104096.png)

**Create specification and call the filtering service.**

You can implement new specification according to new domain logic in here, without modifying the existing code.

And also you can implement or replace with new `data`source module in parameters of filter. 

![image-20220703203324828](.\img\image-20220703203324828.png)

**Call calculation service after filtered the transaction**

![image-20220703200348187](.\img\image-20220703200348187.png)



# How to run

You need to install NodeJS 'v18.4.0' in your local pc as first.

```shell
# Please write down the following command in root directory of project, to install dependecies 
npm install 
```

After that build the project by using

```shell
jay@JHOME:~/Blockchain/Interview$ npx tsc
jay@JHOME:~/Blockchain/Interview$ npm run package
```

Then run with

```shell
jay@JHOME:~/Blockchain/Interview$ ./pftcli --help
```

![image-20220703203932736](.\img\image-20220703203932736.png)



<u>Get all portfolio value information of the tokens</u>

```shell
jay@JHOME:~/Blockchain/Interview$ ./pftcli -f /home/jay/Blockchain/Interview/data/transactions.csv
```

![image-20220703204314923](.\img\image-20220703204314923.png)



<u>Get portfolio value by token name</u>

```shell
jay@JHOME:~/Blockchain/Interview$ ./pftcli -f /home/jay/Blockchain/Interview/data/transactions.csv -t ETH
```

![image-20220703204536557](.\img\image-20220703204536557.png)



<u>Get portfolio value by Date</u>

```shell
jay@JHOME:~/Blockchain/Interview$ ./pftcli -f /home/jay/Blockchain/Interview/data/transactions.csv -d 25-10-2019
```

![image-20220703205105246](.\img\image-20220703205105246.png)



<u>Get portfolio value by Date and Token Name</u>

```shell
jay@JHOME:~/Blockchain/Interview$ ./pftcli -f /home/jay/Blockchain/Interview/data/transactions.csv -d 25-10-2019 -t ETH
```

![image-20220703205440618](.\img\image-20220703205440618.png)

# Drawback

But I'm afraid to says that this program have some performance issues. Although It seems to run smoothly if the file size is small, but when file size is near 1 GB, This program took almost 3 mins to filter the transactions.

I need to upgrade the project for performance optimization.