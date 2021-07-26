=begin
Необходимо создать модуль Fire. В нем определить метод firearms, который должен выводить фразу "It is firearm weapon!".
Также создаем еще один модуль под названием Cold. И в нем метод cold_steel, который должен выводить фразу "It is cold steel weapon!".
Далее создаем класс Weapon. В нем пишем метод define, который должен выводить фразу "It is a weapon!".
После этого создаем классы Knife, Bow, Gun, Rifle, которые наследуют класс Weapon. При этом классы Knife и Bow должны включать модуль Cold, а классы Gun и Rifle - модуль Fire.
Всё! Больше ничего делать не надо.
=end
module Fire

  def firearms
    puts "It is firearm weapon!"
  end

end

module Cold

  def cold_steel
    puts "It is cold steel weapon!"
  end

end

class Weapon

  def define
    puts "It is a weapon!"
  end

end

class Knife < Weapon
  include Cold
end

class Bow < Weapon
  include Cold
end

class Gun < Weapon
  include Fire
end

class Rifle < Weapon
  include Fire
end

# Есть модуль Vehicle, в котором есть классы Car и Bus. Ваша задача создать объекты классов с именами Nissan и Laz соответственно.
Nissan = Vehicle::Car.new
Laz = Vehicle::Bus.new

=begin
Необходимо создать модуль Car и модуль Truck. В обоих модулях реализовать класс Volvo. В модуле Car этот класс должен
содержать переменную класса wheels равную 4, а в модуле Truck этот класс должен содержать переменную класса wheels
равную 6. Также в каждом классе реализовать метод how_many_wheels, который будет выводить переменную класса wheels.
После этого необходимо создать по экземпляру каждого класса (сначала Car, затем Truck). И использовать метод
how_many_wheels на каждом из объектов.
=end

module Car

  class Volvo

    @@wheels = 4
    def how_many_wheels
      puts @@wheels
    end

  end

end

module Truck

  class Volvo

    @@wheels = 6
    def how_many_wheels
      puts @@wheels
    end

  end

end

[Car::Volvo.new, Truck::Volvo.new].each { |it| it.how_many_wheels }

# Создайте структуру Cat, имеющую три атрибута: x, y, z.
Cat = Struct.new :x, :y, :z

=begin
Это не задача!
Но здесь можно поиграться с кодом класса Time. Посмотрите что выводит код ниже, попробуйте его менять и смотрите что он
будет выводить.
Играйтесь и учитесь!
PS: попробуйте код puts Time.public_methods(false),  чтобы посмотреть, какие методы имеет данный класс.
=end
# текущее время
t = Time.now
# произвольная дата
t = Time.new(1988, 6, 10)

# Создайте Proc под названием sum, который должен принимать три параметра и выводить их сумму. Только создать proc, больше ничего делать не нужно.
sum = Proc.new do |x, y, z| puts x + y + z end

=begin
Напишите лямбду square, которая принимает два числа и возводит первое из них в степень второго числа.
Одна строка кода - только реализация лямбды!
=end
square = lambda { |x, y| x**y }