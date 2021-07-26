--Запросы на основе трех и более связанных таблиц
SELECT buy_id, title, price, buy_book.amount
FROM client 
    JOIN buy USING(client_id)
    JOIN buy_book USING(buy_id)
    JOIN book USING(book_id)
WHERE name_client ="Баранов Павел"

--Задание
SELECT DISTINCT name_author, title, COUNT(buy_book.amount) as Количество
FROM book 
    JOIN author USING(author_id)
    LEFT JOIN buy_book USING(book_id)
GROUP BY  name_author, title
ORDER BY name_author, title

--Задание
SELECT 
    DISTINCT name_city,
    COUNT(name_city) AS Количество
FROM city
    JOIN client USING(city_id)
    JOIN buy USING(client_id)
GROUP BY name_city
ORDER BY Количество DESC, name_city

--Задание
SELECT buy_id, date_step_end
FROM buy 
    JOIN buy_step USING(buy_id)
    JOIN step USING(step_id)
GROUP BY buy_id, date_step_end, step_id
HAVING 
    date_step_end IS NOT NULL AND
    step_id = 1

--Задание
SELECT 
    buy_id,
    name_client,
    SUM(buy_book.amount * book.price) AS Стоимость
FROM client JOIN buy USING(client_id)
    JOIN buy_book USING(buy_id)
    JOIN book USING(book_id)
GROUP BY name_client, buy_id
ORDER BY buy_id

--Задание
SELECT buy_id, name_step 
FROM step JOIN buy_step USING(step_id)
WHERE 
    buy_step.date_step_end IS NULL AND
    buy_step.date_step_beg IS NOT NULL

--Задание
SELECT 
    buy_id,
    DATEDIFF(date_step_end, date_step_beg) AS Количество_дней,
    IF (DATEDIFF(date_step_end, date_step_beg) > days_delivery, DATEDIFF(date_step_end, date_step_beg) - days_delivery, 0) AS Опоздание
FROM city 
    JOIN client USING(city_id)
    JOIN buy USING(client_id)
    JOIN buy_step USING(buy_id)
WHERE buy_id IN (
    SELECT buy_id FROM buy_step 
    WHERE 
        step_id = 3 AND
        date_step_end IS NOT NULL)
    AND (DATEDIFF(date_step_end, date_step_beg) > 1)
ORDER BY buy_id

--Задание
SELECT name_client
FROM client 
    JOIN buy USING(client_id)
    JOIN buy_book USING(buy_id)
    JOIN book USING(book_id)
WHERE book.author_id = (SELECT author_id
                        FROM author
                        WHERE name_author = 'Достоевский Ф.М.')
ORDER BY name_client

--Задание
SELECT name_genre, Количество FROM 
    (SELECT 
        name_genre,
        SUM(buy_book.amount) AS Количество
     FROM book 
        JOIN buy_book USING(book_id)
        JOIN genre USING(genre_id)
     GROUP BY name_genre) q
ORDER BY Количество DESC
LIMIT 1

--Задание
SELECT * FROM book JOIN author 
    JOIN genre 
    JOIN city 
    JOIN client 
    JOIN buy 
    JOIN step 
    JOIN buy_step 
    JOIN buy_book