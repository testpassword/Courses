--Выборка всех данных из таблицы
SELECT * FROM book

--Выборка отдельных столбцов
SELECT author, title, price FROM book

--Выборка отдельных столбцов и присвоение им новых имен
SELECT title AS Название, author AS Автор FROM book

-- Выборка данных с созданием вычисляемого столбца
SELECT title, amount, 1.65 * amount AS pack FROM book

--Выборка данных, вычисляемые столбцы, математические функции
SELECT title, author, amount, round(price * 0.7, 2) AS new_price FROM book

--Выборка данных, вычисляемые столбцы, логические функции
SELECT author, 
       title,
       round(IF(author="Булгаков М.А.", price * 1.1, IF(author="Есенин С.А.", price * 1.05, price)), 2) 
AS new_price FROM book

--Выборка данных по условию
SELECT author, title, price FROM book WHERE amount < 10

--Выборка данных, логические операции
SELECT title, author, price, amount FROM book WHERE (price < 500 or price > 600) and (amount * price >= 5000)

--Выборка данных, операторы BETWEEN, IN
SELECT title, author FROM book WHERE (price BETWEEN 540.50 AND 800) AND (amount IN (2, 3, 5, 7))

--Выборка данных, оператор LIKE
SELECT title, author FROM book WHERE (title LIKE "% %") AND (author LIKE "%С.%")

--Выборка данных с сортировкой
SELECT author, title FROM book WHERE (amount BETWEEN 2 AND 14) ORDER BY author DESC, title

--Задание
DROP TABLE book