﻿/*  Вася в школе изучил квадратные уравнения и понял, как они легко решаются путем вычисления дискриминанта. 
 *  Но Петя поведал ему о методе решения кубических уравнений вида A*X3 + B*X2 + C*X + D = 0. На факультативе 
 *  по математике Васе задали решить около ста уравнений как раз такого вида. Но, к сожалению, Вася забыл формулы, 
 *  о которых рассказывал ему Петя. Но Васе было известно, что все корни уравнений – целые числа и находятся
 *  на отрезке [-100, 100]. Поэтому у Васи есть шанс найти их методом перебора, но для этого ему придется затратить 
 *  уйму времени, т.к. возможно необходимо будет осуществить перебор нескольких тысяч значений. Помогите Васе 
 *  написать программу, которая поможет ему найти корни кубических уравнений!
Входные данные

В единственной строке входного файла INPUT.TXT записаны 4 числа: A, B, C и D – целые коэффициенты кубического уравнения. 
Каждый коэффициент по модулю меньше 32768.
Выходные данные

В единственную строку выходного файла OUTPUT.TXT нужно вывести через пробел в порядке возрастания все корни 
заданного кубического уравнения. Кратные корни следует выводить только один раз. 
*/
using System;
class za10
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        int c = int.Parse(Console.ReadLine());
        int d = int.Parse(Console.ReadLine());
        for (int x = -100; x <= 100; x++) if (a * Math.Pow(x, 3) + b * Math.Pow(x, 2) + c * x + d == 0) Console.Write(x + " ");
    }
}