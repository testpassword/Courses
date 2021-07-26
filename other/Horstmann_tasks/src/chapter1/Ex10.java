package chapter1;

/*
Напишите программу, составляющую произвольную символьную строку из букв и цифр, генерируя произвольное значение типа
long и выводя его по основанию 36.
 */

import java.util.UUID;

public class Ex10 {

    public static void main(String[] args) {
        String sequence = UUID.randomUUID().toString().replaceAll("-", "");
        System.out.println(sequence);
        System.out.println(Long.parseLong(sequence, 36));
    }
}