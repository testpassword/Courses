package chapter2;

/*
Предоставьте в классе RandomNumbers два статических метода типа randomElement, получающих произвольный элемент из
обычного или списочного массива целочисленных значений. (Если обычный или списочный массив пуст, должен быть возвращен нуль.)
Почему эти методы нельзя сделать методами экземпляра типа t[] или ArrayList<Integer>?
 */

import java.util.ArrayList;
import java.util.Random;

public class Ex10 {
}

class RandomNumbers {

    private static Random generator = new Random();

    public static int randomElement(int[] numbers) {
        return numbers[generator.nextInt(numbers.length)];
    }

    public static Integer randomElement(ArrayList<Integer> numbers) {
        return numbers.get(generator.nextInt(numbers.size()));
    }
}