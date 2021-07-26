package chapter1;

/*Что произойдет, если привести числовое значение типа double к значению типа int, которое больше самого большого
значения типа int? Попробуйте сделать это.
 */

public class Ex5 {
    public static void main(String[] args) {
        System.out.println(Integer.class.getName() + " " + Integer.MAX_VALUE +
                Double.class.getName() + " " + Double.MAX_VALUE +
                "\n" + (int) Double.MAX_VALUE);
    }
}