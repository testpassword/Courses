package chapter2;

/*
Измените представленную в этой главе программу вывода календаря таким образом, чтобы неделя начиналась с воскресенья.
Кроме того, организуйте перевод на новую строку в конце предыдущей, но только один раз.
 */

import java.time.LocalDate;
import java.time.Month;

public class Ex1 {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2019, Month.JULY, 1);
        while (date.getMonthValue() == Month.JULY.getValue()) {
            System.out.printf("%4d", date.getDayOfMonth());
            date = date.plusDays(6);
        }
    }
}