package chapter1;

//Усовершенствуйте упоминавшийся ранее метод average() таким образом, чтобы он вызывался хотя бы с одним параметром.

public class Ex16 {
    public static double average(double... values) {
        if (values.length == 0) throw new IllegalArgumentException();
        double sum = 0;
        for (double v : values) sum += v;
        return sum / values.length;
    }
}