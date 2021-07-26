/* Требуется сложить два целых числа А и В.
Входные данные

В единственной строке входного файла INPUT.TXT записано два натуральных числа через пробел, не превышающих 109.
Выходные данные

В единственную строку выходного файла OUTPUT.TXT нужно вывести одно целое число — сумму чисел А и В. 
*/
using System;
class za1
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        a += b;
        Console.WriteLine(a);
    }
}