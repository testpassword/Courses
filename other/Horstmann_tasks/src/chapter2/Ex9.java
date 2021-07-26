package chapter2;

/*
Реализуйте класс Car, моделирующий передвижение автомобиля на бензиновом топливе по оси х. Предоставьте методы для
передвижения автомобиля на заданное количество километров, заполнения топливного бака заданным количеством литров бензина,
вычисления расстояния, пройденного от начала координат, а также уровня топлива в баке. Укажите расход топлива (в км/л) в
качестве параметра конструктора данного класса. Должен ли этот класс быть неизменяемым и почему?
 */

class Car {

    private int rate;
    private double X;
    private int tank;

    {
        X = 0;
        tank = 100;
    }

    public Car(int rate) {
        this.rate = rate;
    }

    public void drive(int distance) {
        if (distance / rate < 1) System.out.println("Не достаточно топлива для поездки.");
        else {
            this.X += distance;
            this.tank -= distance / rate;
            System.out.println("Проехали " + distance + " км.");
        }
    }

    public void fillGas(int gas) {
        this.tank += gas;
        System.out.println("Пополнили бак на " + gas + " литров.");
    }

    public int getTank() {
        return tank;
    }
}
