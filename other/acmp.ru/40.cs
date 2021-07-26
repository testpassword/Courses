/*  Необходимо вычислить значение 2n.
Входные данные

В единственной строке входного файла INPUT.TXT записано натуральное число n (0 < n < 1000).
Выходные данные

В единственную строку выходного файла OUTPUT.TXT нужно вывести значение 2^n. */
using System;
class za40
{
    static void Main()
    {
        byte n = byte.Parse(Console.ReadLine());
        Console.WriteLine(Math.Pow(2, n));
    }
}