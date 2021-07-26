package chapter1;

/*
Напишите программу, сохраняющую треугольник Паскаля вплоть до заданной величины n в переменной типа ArrayList<ArrayList<Integer».
 */

import java.util.ArrayList;
import java.util.Scanner;

public class Ex15 {
    public static void main(String[] args) {
        Scanner fromKeyboard = new Scanner(System.in);
        int n = fromKeyboard.nextInt();
        ArrayList<ArrayList<Integer>> triangle = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            triangle.set(i, new ArrayList<>(i + 1));
            triangle.get(i).set(0, 1);
            triangle.get(i).set(i, 1);
            for (int j = 1; j < i; j++) {
                triangle.get(i).set(j, (triangle.get(i - 1).get(j - 1)) + triangle.get(i - 1).get(j));
            }
        }
        for (ArrayList<Integer> row : triangle) {
            for (int element : row) {
                System.out.printf("%4d", element);
            }
            System.out.println();
        }
    }
}