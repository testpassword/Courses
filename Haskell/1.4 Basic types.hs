{-
Вспомним функцию discount, которая возвращала итоговую сумму покупки с возможной скидкой. В качестве параметров 
ей передавались сумма без скидки sum, процент скидки proc, причем скидка начислялась, если переданная сумма 
превышает порог limit. Все эти параметры, как и возвращаемое значение, можно хранить в типе Double. 
(Здесь следует отметить, что в реальных финансовых приложениях использовать тип с плавающей точкой для 
хранения подобной информации не рекомендуется.) Тип функции можно задать в файле исходного кода вместе с ее определением:

discount :: Double -> Double -> Double -> Double
discount limit proc sum = if sum >= limit then sum * (100 - proc) / 100 else sum

Отметим, что объявление типа необязательно, хотя часто рекомендуется в качестве документации. Его обычно располагают перед 
определением функции, хотя это объявление верхнего уровня можно расположить в любом месте файла с исходным кодом.
Запишите тип функции standardDiscount, определенной как частичное применение функции discount:
-}
discount :: Double -> Double -> Double -> Double
discount limit proc sum = if sum >= limit then sum * (100 - proc) / 100 else sum
standartDiscount :: Double -> Double
standartDiscount = discount 1000 5

{-
Реализуйте функцию twoDigits2Int, которая принимает два символа и возвращает число, составленное из этих символов, если оба 
символа числовые, и 100 в противном случае. (Первый символ рассматривается как количество десятков, второй — единиц.)
-}
import Data.Char
twoDigits2Int :: Char -> Char -> Int
twoDigits2Int x y = if (isDigit x && isDigit y) then (digitToInt x * 10 + digitToInt y) else 100

{-
Будем задавать точки на плоскости парами типа (Double, Double). Реализуйте функцию dist, которая возвращает расстояние между 
двумя точками, передаваемыми ей в качестве аргументов. 
-}
dist :: (Double, Double) -> (Double, Double) -> Double
dist p1 p2 = sqrt((fst p2 - fst p1)^2 + (snd p2 - snd p1)^2)