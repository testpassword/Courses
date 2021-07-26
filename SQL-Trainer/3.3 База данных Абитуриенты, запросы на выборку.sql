--Задание
SELECT name_enrollee FROM enrollee
    JOIN program_enrollee USING(enrollee_id)
    JOIN program USING(program_id)
WHERE program_id = 4
ORDER BY name_enrollee

--Задание
SELECT name_program FROM program
    JOIN program_subject USING(program_id)
    JOIN subject USING(subject_id)
WHERE subject_id = 4

--Задание
SELECT 
    name_subject,
    COUNT(name_subject) AS Количество,
    MAX(result) AS Максимум,
    MIN(result) AS Минимум,
    ROUND(AVG(result), 1) AS Среднее
FROM subject JOIN enrollee_subject USING(subject_id)
GROUP BY name_subject
ORDER BY name_subject

--Задание
SELECT name_program FROM program
    JOIN program_subject USING(program_id)
GROUP BY name_program
HAVING MIN(min_ball) >= 40
ORDER BY name_program

--Задание
SELECT name_program, plan FROM program 
WHERE plan = (SELECT MAX(plan) FROM program)

--Задание
SELECT 
    name_enrollee,
    IF(SUM(add_ball) IS NULL, 0, SUM(add_ball)) AS Бонус
FROM enrollee
    LEFT JOIN enrollee_achievement USING(enrollee_id)
    LEFT JOIN achievement USING(achievement_id)
GROUP BY name_enrollee
ORDER BY name_enrollee

--Задание
SELECT name_department, name_program, plan,
    COUNT(name_program) AS Количество,
    ROUND(COUNT(name_program) / plan, 2) AS Конкурс
FROM department
    JOIN program USING(department_id)
    JOIN program_enrollee USING(program_id)
GROUP BY name_department, name_program, plan
ORDER BY Конкурс DESC

--Задание
SELECT name_program FROM subject
    JOIN program_subject USING(subject_id)
    JOIN program USING(program_id)
WHERE name_subject = "Математика" || name_subject = "Информатика"
GROUP BY name_program
HAVING COUNT(subject_id) = 2
ORDER BY name_program

--Задание
SELECT name_program, name_enrollee,
    SUM(result) AS itog
FROM enrollee 
    JOIN program_enrollee USING(enrollee_id)
    JOIN program USING(program_id)
    JOIN program_subject USING(program_id)
    JOIN subject USING(subject_id)
    JOIN enrollee_subject
        ON (subject.subject_id = enrollee_subject.subject_id and enrollee_subject.enrollee_id = enrollee.enrollee_id)
GROUP BY name_program, name_enrollee
ORDER BY name_program, itog DESC

--Задание
SELECT name_program, name_enrollee
FROM enrollee 
    JOIN program_enrollee USING(enrollee_id)
    JOIN program USING(program_id)
    JOIN program_subject USING(program_id)
    JOIN subject USING(subject_id)
    JOIN enrollee_subject
        ON (subject.subject_id = enrollee_subject.subject_id and enrollee_subject.enrollee_id = enrollee.enrollee_id)
WHERE result < min_ball
ORDER BY name_program, name_enrollee

--Задание
SELECT VERSION()