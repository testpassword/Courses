﻿/*  Как и многие другие девочки, Маша любит разные гадания. Некоторое время назад Маша узнала новый способ гадать на числах: 
 *  для какого-нибудь интересующего ее натурального числа n надо посчитать сумму всех чисел, на которые n делится без остатка. 
 *  Маша не очень любит арифметику, и попросила вас написать программу, которая автоматизирует процесс гадания.
Входные данные

В единственной строке входного файла INPUT.TXT записано натуральное число n (n ≤ 1000), которое Маша была вынуждена сообщить.
Выходные данные

В выходной файл OUTPUT.TXT выведите сумму всех натуральных делителей числа n. */
using System;
class za23
{
    static void Main()
    {
        short n = short.Parse(Console.ReadLine());
        short s = 0;
        for (short i = 1; i <= n; i++)
        {
            if (n % i == 0) s += i;
        }
        Console.WriteLine(s);
    }
}