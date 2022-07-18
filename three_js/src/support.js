const randomColor = () => "#" + ((1<<24)*Math.random() | 0).toString(16)

class ColorGUIController {

  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() { return `#${this.object[this.prop].getHexString()}` }

  set value(hexString) { this.object[this.prop].set(hexString) }
}

export { randomColor, ColorGUIController }