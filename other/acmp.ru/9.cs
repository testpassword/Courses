﻿/* Петя успевает по математике лучше всех в классе, поэтому учитель задал ему сложное домашнее задание, 
 * в котором нужно в заданном наборе целых чисел найти сумму всех положительных элементов, затем найти где
 * в заданной последовательности находятся максимальный и минимальный элемент и вычислить произведение чисел, 
 * расположенных между ними.Так же известно, что минимальный и максимальный элемент встречаются в заданном множестве
* чисел только один раз.Поскольку задач такого рода учитель дал Пете около ста, то Петя как сильный программист смог 
 *  написать программу, которая по заданному набору чисел самостоятельно находит решение. А Вам слабо?
Входные данные

В первой строке входного файла INPUT.TXT записано единственное число N – количество элементов массива.
Вторая строка содержит N целых чисел, представляющих заданный массив.Все элементы массива разделены пробелом.
Каждое из чисел во входном файле не превышает 102 по абсолютной величине.
Выходные данные


В единственную строку выходного файла OUTPUT.TXT нужно вывести два числа, разделенных пробелом: сумму
положительных элементов и произведение чисел, расположенных между минимальным и максимальным элементами. 
Значения суммы и произведения не превышают по модулю 3*104. 
*/
using System;
class za9
{
    static void Main()
    {
        byte n = byte.Parse(Console.ReadLine());
        int[] arr = new int[n];
        int i;
        for (i = 0; i < n; i++) arr[i] = int.Parse(Console.ReadLine());
        int s = 0;
        int p = 1;
        int max, min;
        int nmax, nmin;
        max = min = arr[0];
        nmax = nmin = 0;
        for (i = 0; i < n; i++)
        {
            if (arr[i] > 0) s = s + arr[i];
            if (arr[i] > max)
            {
                max = arr[i];
                nmax = i;
            }
            if (arr[i] < min)
            {
                min = arr[i];
                nmin = i;
            }
        }
        //     Console.WriteLine("max = " + max + " min = " + min);
        //     Console.WriteLine("nmax = " + nmax + " nmin = " + nmin);
        Console.WriteLine("сумма = " + s);
        if (nmax < nmin) for (i = ++nmax; i < nmin - 1; i++) p = p * arr[i];
        else for (i = ++nmin; i < nmax; i++) p = p * arr[i];
        Console.WriteLine("произведение = " + p);
    }
}