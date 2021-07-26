package chapter1;

/*
Напишите программу, вводящую целочисленное (как положительное, так и отрицательное) значение угла и нормализующую его
в пределах от 0 до 359 градусов. Попробуйте сделать это сначала с помощью операции %, а затем метода floorMod().
 */

import java.util.Scanner;

public class Ex2 {

    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        int rad = fromKeyboard.nextInt();
        System.out.println(rad % 180);
        System.out.println(Math.floorMod(rad, 180));
    }
}