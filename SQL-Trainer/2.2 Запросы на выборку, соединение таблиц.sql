--Соединение INNER JOIN
SELECT title, name_genre, price
    FROM book INNER JOIN genre
    ON genre.genre_id = book.genre_id
WHERE amount > 8
ORDER BY price DESC

--Внешнее соединение LEFT и RIGHT OUTER JOIN
SELECT name_genre
    FROM genre LEFT JOIN book
    ON genre.genre_id = book.genre_id
WHERE book.amount IS NULL

--Перекрестное соединение CROSS JOIN
SELECT 
    name_city, 
    name_author,
    DATE_ADD("2020-01-01", INTERVAL (FLOOR(RAND() * 365)) DAY) AS Дата
FROM city, author
ORDER BY name_city, Дата DESC

--Запросы на выборку из нескольких таблиц
SELECT name_genre, title, name_author 
FROM genre INNER JOIN book ON genre.genre_id = book.genre_id
    INNER JOIN author ON book.author_id = author.author_id
WHERE name_genre = "Роман"
ORDER BY title

--Запросы для нескольких таблиц с группировкой
SELECT name_author, SUM(amount) AS Количество
FROM author AS a LEFT JOIN book AS b ON a.author_id = b.author_id
GROUP BY name_author
HAVING Количество < 10 OR Количество IS NULL
ORDER BY Количество

--Запросы для нескольких таблиц со вложенными запросами
SELECT name_author FROM author INNER JOIN 
    (SELECT author_id FROM
        (SELECT author_id, genre_id FROM book) AS q1
     GROUP BY author_id
     HAVING COUNT(DISTINCT genre_id) = 1) AS q2
ON author.author_id = q2.author_id

--Вложенные запросы в операторах соединения
SELECT title, name_author, name_genre, price, amount
FROM author INNER JOIN book ON author.author_id = book.author_id
    INNER JOIN genre ON book.genre_id = genre.genre_id
GROUP BY title, name_author, price, amount, book.genre_id
HAVING genre_id IN
      (SELECT query_in_1.genre_id
       FROM (SELECT genre_id, SUM(amount) AS sum_amount
             FROM book
             GROUP BY genre_id
            )query_in_1
       INNER JOIN (SELECT genre_id, SUM(amount) AS sum_amount
                   FROM book
                   GROUP BY genre_id
                   ORDER BY sum_amount DESC
                   LIMIT 1
                  ) query_in_2
       on query_in_1.sum_amount= query_in_2.sum_amount
      );

--Операция соединение, использование USING()
SELECT 
    title AS Название,
    name_author AS Автор,
    book.amount + supply.amount AS Количество
FROM book INNER JOIN author USING(author_id)
    INNER JOIN supply USING(title, amount)

--Задание
SELECT * FROM book