--Создание пустой таблицы
CREATE TABLE supply(
    supply_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    author VARCHAR(50),
    price DECIMAL(8, 2),
    amount INT)

--Добавление записей в таблицу
INSERT INTO supply(title, author, price, amount) VALUES ("Лирика", "Пастернак Б.Л.", 518.99, 2);
INSERT INTO supply(title, author, price, amount) VALUES ("Черный человек", "Есенин С.А.", 570.20, 6);
INSERT INTO supply(title, author, price, amount) VALUES ("Белая гвардия", "Булгаков М.А.", 540.50, 7);
INSERT INTO supply(title, author, price, amount) VALUES ("Идиот", "Достоевский Ф.М.", 360.80, 3);

--Добавление записей из другой таблицы
INSERT INTO book (title, author, price, amount)
    SELECT title, author, price, amount FROM supply WHERE author NOT IN("Булгаков М.А.", "Достоевский Ф.М.")

--Добавление записей, вложенные запросы
INSERT INTO book (title, author, price, amount) 
       SELECT title, author, price, amount FROM supply
       WHERE title NOT IN(SELECT author from book);

--Запросы на обновление
UPDATE book SET price = price - (price * 0.1) WHERE amount >= 5 AND amount <= 10

--Запросы на обновление нескольких столбцов
UPDATE book SET buy = IF (buy >= amount, amount, buy)

--Запросы на обновление, несколько таблиц
UPDATE book, supply 
SET book.amount = book.amount + supply.amount, book.price = (book.price + supply.price) / 2
WHERE book.title = supply.title and book.author = supply.author;

--Запросы на удаление
DELETE FROM supply 
WHERE title IN (SELECT title FROM book
                WHERE supply.author = book.author AND supply.price = book.price)

--Запросы на создание таблицы
CREATE TABLE ordering AS 
    SELECT author, 
           title, 
           (SELECT ROUND(AVG(amount), 0) FROM book) AS amount
    FROM book
    WHERE book.amount < (SELECT ROUND(AVG(amount), 0) FROM book);

--Задание
DROP TABLE book