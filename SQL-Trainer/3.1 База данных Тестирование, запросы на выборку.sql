--Задание
SELECT name_student, date_attempt, result FROM student
    JOIN attempt USING(student_id)
    JOIN subject USING(subject_id)
WHERE name_subject = "Основы баз данных"
ORDER BY result DESC

--Задание
SELECT 
    name_subject,
    COUNT(result) AS Количество,
    ROUND(AVG(result), 2) as Среднее
FROM subject 
    LEFT JOIN attempt USING(subject_id)
GROUP BY name_subject

--Задание
SELECT name_student, result FROM student 
    JOIN attempt USING(student_id)
WHERE result IN (
    SELECT MAX(result) FROM attempt
)
ORDER BY name_student

--Задание
SELECT 
    name_student,
    name_subject,
    DATEDIFF(MAX(date_attempt), MIN(date_attempt)) AS Интервал
FROM student
    JOIN attempt USING(student_id)
        JOIN subject USING(subject_id)
GROUP BY name_subject, name_student
HAVING Интервал > 0
ORDER BY Интервал

--Задание
SELECT
    name_subject,
    COUNT(DISTINCT student_id) AS Количество
FROM subject
    LEFT JOIN attempt USING(subject_id)
GROUP BY name_subject
ORDER BY Количество DESC, name_subject

--Задание
SELECT question_id, name_question FROM question
    JOIN subject USING(subject_id)
WHERE name_subject = "Основы баз данных"
ORDER BY RAND()
LIMIT 3

--Задание
SELECT
    name_question,
    name_answer,
    IF(is_correct, "Верно", "Неверно") AS Результат
FROM question
    JOIN testing USING(question_id)
    JOIN answer USING(answer_id)
WHERE attempt_id = 7

--Задание
SELECT name_student, name_subject, date_attempt,
    ROUND(SUM(is_correct) / 3 * 100, 2) AS Результат
FROM subject
    JOIN attempt USING(subject_id)
    JOIN student USING(student_id)
    JOIN testing USING(attempt_id)
    JOIN answer USING(answer_id)
GROUP BY name_student, name_subject, date_attempt
ORDER BY name_student, date_attempt DESC

--Задание
SELECT 
    name_subject,
    CONCAT(LEFT(name_question, 30), "...") AS Вопрос,
    COUNT(testing.question_id) AS Всего_ответов,
    ROUND(SUM(answer.is_correct) / COUNT(testing.question_id) * 100, 2) AS Успешность
FROM answer
    JOIN testing USING(answer_id)
    JOIN question ON (question.question_id = testing.question_id)
    JOIN subject ON (subject.subject_id = question.subject_id)
GROUP BY name_subject, Вопрос
ORDER BY name_subject, Успешность DESC, Вопрос

--Задание
SELECT * FROM answer