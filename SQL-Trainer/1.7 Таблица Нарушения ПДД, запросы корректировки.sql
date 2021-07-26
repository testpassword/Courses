--Задание
CREATE TABLE fine(
    fine_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    number_plate VARCHAR(6),
    violation VARCHAR(50),
    sum_fine DECIMAL(8, 2),
    date_violation DATE,
    date_payment DATE)

--Задание
INSERT INTO fine(name, number_plate, violation, date_violation) VALUES
    ("Баранов П.Е.", "Р523ВТ", "Превышение скорости(от 40 до 60)", "2020-02-14");
INSERT INTO fine(name, number_plate, violation, date_violation) VALUES
    ("Абрамова К.А.", "О111АВ", "Проезд на запрещающий сигнал", "2020-02-23");
INSERT INTO fine(name, number_plate, violation, date_violation) VALUES
    ("Яковлев Г.Р.", "Т330ТТ", "Проезд на запрещающий сигнал", "2020-03-03");

--Задание
UPDATE fine AS f, traffic_violation AS tv
SET f.sum_fine = tv.sum_fine
WHERE (f.sum_fine IS NULL) AND (f.violation = tv.violation);

--Задание
SELECT
    name,
    number_plate,
    violation
FROM fine
GROUP BY name, number_plate, violation
HAVING COUNT(number_plate) >= 2

--Задание
UPDATE fine AS f, (
    SELECT
        name,
        number_plate,
        violation
    FROM fine
    GROUP BY name, number_plate, violation
    HAVING COUNT(number_plate) >= 2
    ) AS q
SET f.sum_fine = f.sum_fine * 2
WHERE
    f.name = q.name AND
    f.number_plate = q.number_plate AND
    f.violation = q.violation AND
    f.date_payment IS NULL

--Задание
UPDATE fine AS f, payment AS p
SET f.sum_fine = IF(DATEDIFF(p.date_payment, p.date_violation) - 1 <= 20, f.sum_fine / 2, f.sum_fine), f.date_payment = p.date_payment
WHERE
    f.name = p.name AND
    f.number_plate = p.number_plate AND
    f.violation = p.violation AND
    f.date_payment IS NULL

--Задание
CREATE TABLE back_payment AS
    SELECT name,
           number_plate,
           violation,
           sum_fine,
           date_violation
    FROM fine
    WHERE date_payment IS NULL

--Задание
DELETE FROM fine WHERE date_violation < "2020-02-01"