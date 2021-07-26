﻿/*  Одна из основных операций с числами – их сравнение. Мы подозреваем, что вы в совершенстве владеете этой 
 *  операцией и можете сравнивать любые числа, в том числе и целые. В данной задаче необходимо сравнить два целых числа.
Входные данные

В двух строчках входного файла INPUT.TXT записаны числа A и B, не превосходящие по абсолютной величине 2×109.
Выходные данные

Запишите в выходной файл OUTPUT.TXT один символ “<”, если A < B, “>”, если A > B и “=”, если A=B. */
using System;
class za25
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        if (a < b) Console.WriteLine("<");
        else if (a > b) Console.WriteLine(">");
        else if (a == b) Console.WriteLine("=");
    }
}