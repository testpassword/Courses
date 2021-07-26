package chapter1;

/*Напишите программу, выводящую наименьшее и наибольшее положительные значения типа double. Подсказка: воспользуйтесь
 методом Math.nextUp() из прикладного программного интерфейса Java API.
 */

public class Ex4 {
    public static void main(String[] args) {
        System.out.println(Math.nextUp(Double.MIN_NORMAL) + "\n" + Math.nextUp(Double.MAX_VALUE));
    }
}