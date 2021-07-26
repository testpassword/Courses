package chapter2;

/*
Реализуйте неизменяемый класс Point, описывающий точку на плоскости. Предоставьте его конструктор, чтобы задать конкретную точку;
конструктор без аргументов, чтобы задать точку в начале координат; а также методы getX(), getY(), translate() и scale().
В частности, метод translate() должен перемещать точку на определенное расстояние в направлении координат х и у,
а метод scale() — изменять масштаб по обеим координатам на заданный коэффициент.
Реализуйте эти методы таким образом, чтобы они возвращали новые точки в качестве результата. Например, в следующей строке кода:
Point р = new Point(3, 4).translate(1, 3).scale(0.5);
в переменной р должна быть установлена точка с координатами (2, 3.5).
 */

public class Ex5 {
    public static void main(String[] args) {
        Point5 p = new Point5(3, 4).translate(1, 3).scale(0.5);
        System.out.println(p);
    }
}

class Point5 {

    private double x;
    private double y;

    public Point5() {
        this.x = 0;
        this.y = 0;
    }

    public Point5(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public Point5 translate(double x, double y) {
        return new Point5(this.x + x, this.y + y);
    }

    public Point5 scale(double k) {
        return new Point5(this.x = x * k, this.y = y * k);
    }

    @Override
    public String toString() {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
