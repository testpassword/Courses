--Задание
SELECT name, city, per_diem, date_first, date_last FROM trip
WHERE name LIKE "%а %"
ORDER BY date_last DESC

--Задание
SELECT DISTINCT name FROM trip WHERE city = "Москва" ORDER BY name

--Задание
SELECT
    city,
    COUNT(city) AS "Количество"
FROM trip
GROUP BY city
ORDER BY city

--Задание
SELECT 
    city,
    COUNT(city) AS "Количество"
FROM trip
GROUP BY city
ORDER BY COUNT(city) DESC LIMIT 2

--Задание
SELECT 
    name,
    city,
    DATEDIFF(date_last, date_first) + 1 AS Длительность
FROM trip
WHERE city NOT IN ("Москва", "Санкт-Петербург")
ORDER BY Длительность DESC, city DESC

--Задание
SELECT name, city, date_first, date_last
FROM trip
WHERE (abs(DATEDIFF(date_last, date_first))) = (SELECT MIN(DATEDIFF(date_last, date_first)) FROM trip)

--Задание
SELECT
    name,
    city,
    date_first,
    date_last
FROM trip
WHERE MONTH(date_first)=MONTH(date_last)
ORDER BY city, name

--Задание
SELECT 
    MONTHNAME(date_first) AS Месяц,
    COUNT(MONTHNAME(date_first)) AS Количество
FROM trip
GROUP BY Месяц
ORDER BY Количество DESC, Месяц

--Задание
SELECT
    name,
    city,
    date_first,
    (DATEDIFF(date_last, date_first) + 1) * per_diem AS Сумма
FROM trip
WHERE MONTH(date_first) IN (2, 3)
ORDER BY name, Сумма DESC

--Задание
SELECT 
    name,
    SUM((DATEDIFF(date_last, date_first) + 1) * per_diem) AS Сумма
FROM trip
GROUP BY name
HAVING COUNT(NAME) > 3