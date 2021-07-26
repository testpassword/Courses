package chapter1;

/*
Напишите программу, вводящую текстовую строку и выводящую все символы, не представленные в коде ASCII, вместе с их значениями в Юникоде.
 */

import java.util.Scanner;

public class Ex11 {
    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        int[] codes = fromKeyboard.nextLine().codePoints().toArray();
        for (int a : codes) {
            if (a > 127) System.out.println((char) a + " " + String.format("\\u%04x", a));
        }
    }
}