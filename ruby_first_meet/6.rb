# Создайте класс Car.
class Car
end

# Создайте класс Box, который при инициализации должен выводить надпись "Box created" (без кавычек).
class Box

  def initialize
    puts "Box created"
  end

end

# Создайте класс Animal (метод инициализации должен выводить "Grrr!" (без кавычек), а затем создайте объект dog класса Animal.
class Animal

  def initialize
    puts "Grrr!"
  end

end

dog = Animal.new

=begin
Создайте класс Animal. Используя метод инициализации реализуйте переменную экземпляра age, которая должна принимать
значение переменной, переданной в метод new при создании нового объекта.Создавайте только класс согласно условию выше.
Новый объект создавать не надо!
=end
class Animal

  def initialize(age)
    @age = age
  end

end

=begin
Необходимо создать класс Soldier, в котором реализовать два метода - fight и defence. Первый метод должен выводить фразу
"Urrra!" (без кавычек), второй - выводить фразу "We loose, go home!". После этого создайте экземпляр класса Soldier и
вызовите на нем первый и второй методы.
=end
class Soldier

  def fight
    puts "Urrra!"
  end

  def defence
    puts "We loose, go home!"
  end

end

soldier = Soldier.new
soldier.fight
soldier.defence

=begin
Напишите класс Star, имеющий переменную экземпляра distance. Создайте методы get_distance и set_distance соответственно
для доступа к переменной и для ее изменения.
=end
class Star

  @distance = 0

  def get_distance
    @distance
  end

  def set_distance=(dist)
    @distance = dist
  end

end

=begin
Давайте перепишем предыдущую задачу, используя полученные на предыдущем шаге знания. То есть называя методы getter и
setter по имени переменной. Напоминаю условие задачи:
Напишите класс Star, имеющий переменную экземпляра distance. Создайте методы getter и setter по имени переменной,
соответственно для доступа к переменной и для ее изменения.
=end
class Star

  @distance = 0

  def distance
    @distance
  end

  def distance=(dist)
    @distance = dist
  end

end

# Напишите класс Car, в котором реализуйте свойство экземпляра name и методы доступа (из предыдущего шага) к нему.
class Car

  def initialize(name)
    @name = name
  end

  attr_accessor :name

end

# Напишите класс Calc, в котором реализуйте метод класса sqr, который должен принимать один параметр и возводить его в квадрат.
class Calc

  def self.sqr x
    x**2
  end

end

# Напишите класс Car и создайте в нем константу WHEELS равную 4. После чего выведите значение константы.
class Car

  WHEELS = 4

end

puts Car::WHEELS

# Ваша задача написать класс Custom, в котором реализовать пользовательский вариант метода to_s, который должен выводить текст "Пользовательский вывод"
class Custom

  def to_s
    "Пользовательский вывод"
  end

end

# Есть класс Vehicle. Создайте подкласс Car, который будет наследовать класс Vehicle.
class Car < Vehicle
end

=begin
Создайте класс Vehicle, в котором реализуйте метод make_sound, который должен выводить строку "Boo". После этого
создайте подкласс Car, который будет наследовать Vehicle, создайте новый экземпляр этого подкласса и вызовите на нем метод make_sound.
=end
class Vehicle

  def make_sound
    puts "Boo"
  end

end

class Car < Vehicle
end

Car.new.make_sound

=begin
Напишите класс Cost, который должен иметь свойства rub и cop. При этом мы должны иметь возможность перемножить два
объекта класса Cost, и получить при этом в результате перемноженные свойства rub и cop этих объектов. Для решения
читайте предыдущий шаг.
=end
class Cost

  attr_accessor :rub, :cop

  def initialize(rub, cop)
    @rub = rub
    @cop = cop
  end

  def *(cost)
    Cost.new(@rub * cost.rub, @cop * cost.cop)
  end

end

=begin
Это не задача. Здесь вы можете поиграться с финальным кодом игры. Играйте в игру, или пробуйте изменить ее код.
Жмите "Запустить код", чтобы выполнить код и увидеть результат.
=end
class Player
  attr_accessor :name, :health, :power
  def initialize(n, h, pow)
    @name = n
    @health = h
    @power = pow
  end
  def isAlive
    @health > 0
  end
  def hit(opponent)
    opponent.health -= self.power
  end
  def to_s
    "#{name}: Health: #{health}, Power: #{power}"
  end
end

def fight(p1, p2)
  while p1.isAlive && p2.isAlive
    p1.hit(p2)
    p2.hit(p1)
  end

  if p1.isAlive
    "#{p1.name} WON!"
  elsif p2.isAlive
    "#{p2.name} WON!"
  else
    "TIE!"
  end
end

def show_info(*p)
  p.each { |x| puts x}
end

#initialize Players
p1 = Player.new("Player 1", 1+rand(100), 1+rand(20))
p2 = Player.new("Player 2", 1+rand(100), 1+rand(20))
#show Player info
fight(p1, p2)

=begin
Напишите класс Dog, создайте две переменные класса - legs равная 4 и voice равная "Rrr". Реализуйте методы legs и voice
для доступа к соответствующим переменным класса.
=end
class Dog

  @@legs = 4
  @@voice = "Rrr"

  def self.legs
    @@legs
  end

  def self.voice
    @@voice
  end

end

=begin
На вход подается строка. Вам необходимо считать ее в переменную x. Затем создайте класс Custom, в нем реализуйте
пользовательский вариант метода to_s, который должен выводить считанную ранее строку. Строку нужно передать в класс при
создании нового объекта (создайте новый объект и передайте в него строку). После всего этого - выведите новый объект,
чтобы отработал метод to_s.
=end
class Custom

  def initialize x
    @x = x
  end

  def to_s
    @x
  end

end

x = gets
puts Custom.new x