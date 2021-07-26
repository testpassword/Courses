--Выбор различных элементов столбца
SELECT DISTINCT amount FROM book

--Выборка данных, групповые функции SUM и COUNT
SELECT 
       author AS "Автор", 
       COUNT(title) AS "Различных_книг", 
       SUM(amount) AS "Количество_экземпляров" 
FROM book GROUP BY author;

--Выборка данных, групповые функции MIN, MAX и AVG
SELECT
    author,
    MIN(price) AS "Минимальная_цена",
    MAX(price) AS "Максимальная_цена",
    AVG(price) AS "Средняя_цена"
FROM book GROUP BY author;

--Выборка данных c вычислением, групповые функции
SELECT
    author,
    ROUND(SUM(price * amount), 2) AS "Стоимость",
    ROUND(((SUM(price * amount) * 18 / 100) / (1 + 18 / 100)), 2) AS "НДС",
    ROUND(SUM(price * amount) / (1 + 18 / 100), 2) AS "Стоимость_без_НДС"
FROM book GROUP BY author;

--Вычисления по таблице целиком
SELECT
    ROUND(MIN(price), 2) AS "Минимальная_цена",
    ROUND(MAX(price), 2) AS "Максимальная_цена",
    ROUND(AVG(price), 2) AS "Средняя_цена"
FROM book

--Выборка данных по условию, групповые функции
SELECT
    ROUND(AVG(price), 2) AS "Средняя_цена",
    ROUND(SUM(amount * price), 2) AS "Стоимость"
FROM book WHERE (amount BETWEEN 5 AND 14);

--Выборка данных по условию, групповые функции, WHERE и HAVING
SELECT
    author,
    ROUND(SUM(price * amount), 2) AS Стоимость
FROM book
WHERE
    title <> "Идиот" AND title <> "Белая гвардия"
GROUP BY author
HAVING Стоимость > 5000
ORDER BY Стоимость DESC;

--Задание
SELECT
    author,
    COUNT(title) AS Количество_произведений,
    MIN(price) AS Минимальная_цена,
    SUM(amount) AS Число_книг
FROM book
WHERE (price > 500) AND (amount > 1)
GROUP BY author
HAVING Количество_произведений > 2;