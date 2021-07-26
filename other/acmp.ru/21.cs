﻿/*  В отделе работают 3 сотрудника, которые получают заработную плату в рублях. 
 *  Требуется определить: на сколько зарплата самого высокооплачиваемого из них отличается от самого низкооплачиваемого.
Входные данные

В единственной строке входного файла INPUT.TXT записаны размеры зарплат всех сотрудников через пробел. 
Каждая заработная плата – это натуральное число, не превышающее 105.
Выходные данные

В выходной файл OUTPUT.TXT необходимо вывести одно целое число — разницу между максимальной и минимальной зарплатой. */
using System;
class za21
{
    static void Main()
    {
        int[] money = new int[3];
        int i;
        for (i = 0; i < 3; i++) money[i] = int.Parse(Console.ReadLine());
        int max, min;
        max = min = money[0];
        for (i = 0; i < 3; i++)
        {
            if (money[i] > max) max = money[i];
            if (money[i] < min) min = money[i];
        }
        Console.WriteLine(max - min);
    }
}