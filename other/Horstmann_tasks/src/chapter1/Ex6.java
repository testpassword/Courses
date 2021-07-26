package chapter1;

//Напишите программу, вычисляющую факториал n! = 1 х 2 * . . . х n, используя класс BigInteger. Вычислите факториал числа 1000.

import java.math.BigInteger;
import java.util.Scanner;

public class Ex6 {
    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        int n = fromKeyboard.nextInt();
        BigInteger result = BigInteger.ONE;
        for (int i = 1; i <= n; i++) result = result.multiply(BigInteger.valueOf(i));
        System.out.println(result);
        result = BigInteger.ONE;
        for (int i = 1; i <= 1000; i++) result = result.multiply(BigInteger.valueOf(i));
        System.out.println(result);
    }
}