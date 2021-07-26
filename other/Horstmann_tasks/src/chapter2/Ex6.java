package chapter2;

//Повторите предыдущее упражнение, но на этот раз сделайте методы translate() и scale() модифицирующими.

public class Ex6 {
    public static void main(String[] args) {
        Point6 p = new Point6(3, 4).translate(1, 3).scale(0.5);
        System.out.println(p);
    }
}

/**
 * {@code Point6} класс, представляющий точку на двумерной поверхности.
 * @author Артемий Кульбако
 * @version 1.0
 */
class Point6 {

    private double x;
    private double y;

    /**
     * Создаёт точку в начале координат.
     */
    public Point6() {
        this.x = 0;
        this.y = 0;
    }

    /**
     * Создаёт точку по указанным координатам.
     * @param x - абсцисса.
     * @param y - ордината.
     */
    public Point6(double x, double y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @return возвращает абсциссу.
     */
    public double getX() {
        return x;
    }

    /**
     * @return возвращает ординату.
     */
    public double getY() {
        return y;
    }

    /**
     * Перемещает точку на заданное смещение.
     * @param x - смещение по оси OX.
     * @param y - смещение по оси OY.
     * @return текущую точку после модификации.
     */
    public Point6 translate(double x, double y) {
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * Меняет масштаб точку.
     * @param k - коофицент масштабирования.
     * @return текущую точку после модификации.
     */
    public Point6 scale(double k) {
        this.x *= k;
        this.y *= k;
        return this;
    }

    /**
     * @return Информация о объекте в виде значения координат.
     */
    @Override
    public String toString() {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
