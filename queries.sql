-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT p.ProductName, c.CategoryName
  FROM Category as c
  join Product as p on c.Id = p.CategoryId

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select o.Id, sh.CompanyName from [Order] as o
join Shipper as sh
on o.ShipVia = sh.Id
where o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT o.quantity, Product.ProductName
  FROM OrderDetail as o
  INNER JOIN Product on O.ProductId = Product.Id
  WHERE o.OrderId = 10251

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT o.Id as OrderId, Customer.CompanyName, Employee.LastName
FROM 'Order' as o
JOIN Employee on o.EmployeeId = Employee.Id
JOIN Customer on o.CustomerId = Customer.Id;