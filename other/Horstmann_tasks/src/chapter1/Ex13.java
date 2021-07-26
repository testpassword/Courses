package chapter1;

/*
Напишите программу, выбирающую и выводящую лотерейную комбинацию из шести отдельных чисел в пределах от 1 до 49.
Чтобы выбрать шесть отдельных чисел, начните со списочного массива, заполняемого числами от 1 до 49.
Выберите произвольный индекс и удалите элемент массива. Повторите эти действия шесть раз подряд.
Выведите полученный результат в отсортированном порядке.
 */

import java.util.ArrayList;
import java.util.Random;

public class Ex13 {
    public static void main(String[] args) {
        Random generator = new Random();
        int min, max;
        min = 1;
        max = 49;
        ArrayList<Integer> numbers = new ArrayList<>(6);
        for (int i = 1; i <= 12; i++) numbers.add(generator.nextInt(max - min + 1));
        numbers.sort(Integer::compareTo);
        System.out.println(numbers);
    }
}
