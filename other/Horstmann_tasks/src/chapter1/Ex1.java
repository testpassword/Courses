package chapter1;

import java.util.Scanner;

/*
Напишите программу, вводящую целочисленное значение и выводящую его в двоичной, восьмеричной и шестнадцатеричной форме.
Организуйте вывод обратного значения в виде шестнадцатеричного числа с плавающей точкой.
 */

public class Ex1 {

    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        System.out.println(Integer.toBinaryString(n) + " " + Integer.toOctalString(n) + " " + Integer.toHexString(n));
        System.out.println(new StringBuilder(Float.toHexString(n)).reverse().toString());
    }
}
