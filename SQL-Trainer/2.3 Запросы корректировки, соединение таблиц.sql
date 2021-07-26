--Запросы на обновление, связанные таблицы
UPDATE book 
JOIN author USING(author_id) 
    JOIN supply ON book.title = supply.title AND supply.author = author.name_author
SET 
    book.amount = book.amount + supply.amount,
    book.price = (book.price * book.amount + supply.price * supply.amount) / (book.amount + supply.amount),
    supply.amount = 0   
WHERE book.price <> supply.price;

--Запросы на добавление, связанные таблицы
INSERT INTO author(name_author)
    (SELECT supply.author
     FROM author RIGHT JOIN supply ON author.name_author = supply.author
     WHERE name_author IS NULL); 
SELECT * FROM author;

--Запрос на добавление, связанные таблицы
INSERT INTO book(title, author_id, price, amount)
    (SELECT title, author_id, price, amount
     FROM author 
     INNER JOIN supply ON author.name_author = supply.author
     WHERE amount <> 0);
SELECT * FROM book;

--Запрос на обновление, вложенные запросы
UPDATE book
SET genre_id = (SELECT genre_id FROM genre WHERE name_genre = "Поэзия")
WHERE title = "Стихотворения и поэмы";

UPDATE book
SET genre_id = (SELECT genre_id FROM genre WHERE name_genre = "Приключения")
WHERE title = "Остров сокровищ";

--Каскадное удаление записей связанных таблиц
DELETE FROM author
WHERE author_id IN
    (SELECT author_id
     FROM book
     GROUP BY author_id
     HAVING SUM(amount) < 20)

--Удаление записей главной таблицы с сохранением записей в зависимой
DELETE FROM genre 
WHERE genre_id IN 
    (SELECT genre_id FROM book 
     GROUP BY genre_id 
     HAVING COUNT(amount) < 3);

--Задание
DELETE FROM book
WHERE title IS NULL OR author_id IS NULL