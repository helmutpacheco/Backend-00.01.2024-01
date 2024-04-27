Select * from customers where country = 'USA';

Select * from suppliers where country = 'Berlin';

Select * from employees where EmployeeID in (3, 5 ,8);

Select * from products where unit > 0 and SupplierID in (1, 3, 5);

Select * from products where Price between 20 and 90;

Select * from orders where orderdate between '1997-01-01' and '1997-07-15';

Select * from orders where year(orderdate) = 1997 and EmployeeID in (1, 3, 4, 8); 

Select * from orders where year(orderdate) = 1996; 

Select * from orders where year(orderdate) = 1997 and month(orderdate) = 04;

Select * from orders where year(orderdate) = 1998 and day(orderdate) = 01;

Select * from employees where fax is null or fax = '';

Select * from employees where fax is not null or fax != '';

Select productName, price, unit, categories.CategoryName from products
INNER JOIN categories ON products.CategoryID = categories.CategoryID;

Select productName, price, suppliers.SupplierID, suppliers.SupplierName from products
INNER JOIN suppliers ON products.SupplierID = suppliers.SupplierID;

Select OrderID, orderdetails.ProductID, products.Price, Quantity, products.Price * Quantity as FullPayment from orderdetails
INNER JOIN products ON orderdetails.ProductID = products.ProductID;

Select orders.OrderID, orders.OrderDate, products.ProductID, products.Price, employees.EmployeeID,
CONCAT(employees.FirstName, ' ',employees.LastName) as FullName from Orders
INNER JOIN orderdetails on orders.OrderID = orderdetails.OrderID
INNER JOIN products on orderdetails.ProductID = products.ProductID
INNER JOIN employees on orders.EmployeeID = employees.EmployeeID;

Select * from products order by Unit asc limit 10;

Select * from products order by Unit desc limit 10;

Select * from products order by Price asc limit 10;

Select * from products order by Price desc limit 10;

Select * from customers order by Company;

Select * from customers where Company like 'B%' and Country = 'UK' order by Company;

Select * from products inner join categories on products.CategoryID = categories.CategoryID where CategoryID in (1, 3 ,5)
order by categories.CategoryName;

Select * from products where price between 50 and 200;

Select companies.CompanyName, customers.CompanyID, orders.OrderDate, products.Price, products.ProductName from customers
inner join companies on customers.CompanyID = companies.CompanyID
inner join orders on customers.OrderID = orders.OrderID
inner join orderdetails on orders.ProductID = orderdetails.ProductID
inner join products on orderdetails.OrderDetailID = products.OrderDetailID;

Select categories.CategoryName, Count(products.CategoryID) as Stock from categories
inner join products on categories.CategoryID = products.CategoryID group by categories.CategoryName;

Select orderdetails.ProductID, products.ProductName, count(*) as TotalSales from orderdetails 
inner join products on orderdetails.ProductID = products.ProductID group by ProductID order by TotalSales DESC limit 5;

Select bosses.BossName from employees inner join bosses on employees.BossID = bosses.BossID;

Select * from products where ProductName like 'M%' and Price between 28 and 129

Select * from customers where Country in ('USA','UK','France')

Select * from products where unit like '-%' and count = 0

Select orders.EmployeeID, CONCAT(employees.LastName, ' ', employees.FirstName) FullName, orders.* from orders inner join employees on orders.EmployeeID = employees.EmployeeID where CONCAT(LastName, ' ', FirstName) = 'King Robert'

Select orders.OrderID, orders.CustomerID, customers.CustomerName, orders.EmployeeID, orders.OrderDate, orders.ShipperID from orders inner join customers on orders.CustomerID = customers.CustomerID where CustomerName = 'Que Delícia'

Select orders.EmployeeID, CONCAT(employees.LastName, ' ', employees.FirstName) FullName, orders.* from orders inner join employees on orders.EmployeeID = employees.EmployeeID where CONCAT(LastName, ' ', FirstName) in ('King Robert', 'Davolio Nancy', 'Fuller Andrew')

Select orderdetails.OrderID, orderdetails.ProductID, products.ProductName, products.Price, products.Unit from orderdetails inner join products on orderdetails.ProductID = products.ProductID Where orderdetails.OrderID = 10257

Select orderdetails.ProductID, products.ProductName, products.Price, orderdetails.Quantity, orders.OrderDate from orderdetails
inner join products on orderdetails.ProductID = products.ProductID
inner join orders on orderdetails.OrderID = orders.OrderID
Where orders.OrderDate between '1997-01-01' and CURRENT_DATE()

Select distinct price from products order by price desc limit 15

Select distinct price from products order by price asc limit 5

Select products.ProductName, categories.CategoryName, products.price, products.unit from products inner join categories on products.CategoryID = categories.CategoryID

Select products.ProductName, categories.CategoryName from products inner join categories on products.CategoryID = categories.CategoryID where CategoryName not like 'P%'

Select categories.CategoryID catId, categories.CategoryName catName, count(products.ProductID) stock from products inner join categories on products.CategoryID = categories.CategoryID group by catId, catName

Select customers.CustomerName, suppliers.SupplierName, concat(employees.LastName, ' ', employees.FirstName) FullName_Employee, products.ProductName from orders inner join customers ON orders.CustomerID = customers.CustomerID inner join employees ON orders.EmployeeID = employees.EmployeeID inner join orderdetails ON orders.OrderID = orderdetails.OrderID inner join products ON orderdetails.ProductID = products.ProductID inner join suppliers ON products.SupplierID = suppliers.SupplierID where orders.OrderID = 10794

Select count(OrderID), CustomerID, year(OrderDate) from orders group by CustomerID, OrderDate order by CustomerID, year(OrderDate)

Select year(OrderDate), month(OrderDate), count(OrderID) from orders group by year(OrderDate), month(OrderDate) order by year(OrderDate), month(OrderDate);

Select customers.CustomerName, orders.OrderID, orders.OrderDate, orderdetails.ProductID, orderdetails.Quantity, products.productName, suppliers.SupplierName, suppliers.City from orders
inner join customers on orders.CustomerID = customers.CustomerID
inner join orderdetails on orders.OrderID = orderdetails.OrderID
inner join products on orderdetails.ProductID = products.ProductID
inner join suppliers on products.SupplierID = suppliers.SupplierID

Select customers.CustomerName, suppliers.ContactName, orders.OrderID, orders.orderdate, products.ProductID, orderdetails.Quantity, products.ProductName, suppliers.SupplierName from orders
inner join customers on orders.CustomerID = customers.CustomerID
inner join orderdetails on orders.OrderID = orderdetails.OrderID
inner join products on orderdetails.ProductID = products.ProductID
inner join suppliers on products.SupplierID = suppliers.SupplierID
where suppliers.SupplierName between 'A%' and 'G%' and orderdetails.Quantity between 23 and 187