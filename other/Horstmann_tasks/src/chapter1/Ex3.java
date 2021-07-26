package chapter1;

import java.util.Arrays;
import java.util.Scanner;

/*
Напишите программу, вводящую три целочисленных значения и выводящую самое большое из них, используя только условную
операцию. Сделайте то же самое с помощью метода Math.mах().
 */
public class Ex3 {

    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        int[] numbers = new int[3];
        for (int i = 0; i < numbers.length; i++) numbers[i] = fromKeyboard.nextInt();
        System.out.println(Arrays.toString(numbers));
        if (numbers[0] > numbers[1])
        {
            if (numbers[0] > numbers[2]) System.out.println(numbers[0]);
            else System.out.println(numbers[2]);
        }
        else {
            if (numbers[1] > numbers[2]) System.out.println(numbers[1]);
            else System.out.println(numbers[2]);
        }
        int max = Math.max(numbers[0], numbers[1]);
        max = Math.max(max, numbers[2]);
        System.out.println(max);
    }
}