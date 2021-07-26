package chapter1;

/*Напишите программу, вводящую два числа в пределах от 0 до 65535, сохраняющую их в переменных типа short и вычисляющую
их сумму, разность, произведение, частное и остаток без знака, не преобразуя эти величины в тип int.
 */

import java.util.Scanner;

public class Ex7 {
    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        short[] numbers = new short[2];
        for (int i = 0; i < numbers.length; i++) {
            int n = fromKeyboard.nextInt();
            if (n < 0 || n > 65535) {
                System.out.println("Пределы = от 0 до 65535");
                i--;
                continue;
            } else numbers[i] = (short) n;
        }
        try {
            System.out.println("sum = " + (numbers[0] + numbers[1]) +
                    "\ndif = " + (numbers[0] - numbers[1]) +
                    "\nmult = " + (numbers[0] * numbers[1]) +
                    "\ndiv = " + (numbers[0] / numbers[1]));
        } catch (ArithmeticException e) {
            e.getLocalizedMessage();
        }
    }
}