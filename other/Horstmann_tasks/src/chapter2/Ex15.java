package chapter2;

/*
Реализуйте полностью класс Invoice, представленный в разделе 2.6.1. Предоставьте метод, выводящий счет-фактуру,
и демонстрационную версию программы, составляющей и выводящей образец счета-фактуры.
 */

import java.util.ArrayList;

public class Ex15 {
}

class Invoice {

    private ArrayList<Item> items = new ArrayList();

    public static class Item { // Открытый вложенный класс
          private String description;
          private int quantity;
          private double unitPrice;

        public Item(String description, int quantity, double unitPrice) {
         this.description = description;
         this.quantity = quantity;
          this.unitPrice = unitPrice;
      }

        public double price() {
            return quantity * unitPrice;
         }
     }

    public void add(Item item) { items.add(item);
    }
}

