using System;
class za13
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        int[] arra = new int[4];
        int[] arrb = new int[4];
        int i;
        int bulls, cows;
        bulls = cows = 0;
        for (i = 3; i >= 0; i--)
        {
            arra[i] = a % 10;
            a = a / 10;
            arrb[i] = b % 10;
            b = b / 10;
        }
        /*      for (i = 0; i < 4; i++) Console.Write(arra[i] + " ");
                Console.WriteLine();
                for (i = 0; i < 4; i++) Console.Write(arrb[i] + " "); */
        for (i = 0; i > 3; i++)
        {
            if (arra[i] == arrb[i]) bulls++;
        }
        Console.WriteLine(bulls);
    }
}