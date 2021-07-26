--Вложенный запрос, возвращающий одно значение
SELECT author, title, price FROM book WHERE price <= (SELECT AVG(price) FROM book) ORDER BY price DESC

--Использование вложенного запроса в выражении
SELECT author, title, price FROM book WHERE (price - (SELECT MIN(price) FROM book)) < 150 ORDER BY price

--Вложенный запрос, оператор IN
SELECT author, title, amount
FROM book
WHERE amount IN (SELECT amount FROM book GROUP BY amount HAVING COUNT(amount) = 1);

--Вложенный запрос, операторы ANY и ALL
SELECT author, title, price
FROM book
WHERE author = ANY (SELECT author FROM book GROUP BY author HAVING AVG(price) > 
                              (SELECT AVG(price) FROM book))

--Вложенный запрос после SELECT
SELECT
    title,
    author,
    amount,
    ((SELECT MAX(amount) FROM book) - amount) AS "Заказ"
FROM book
WHERE amount <> (SELECT MAX(amount) FROM book)

--Задание
SELECT author, title, price
FROM book
WHERE round(price)<>price