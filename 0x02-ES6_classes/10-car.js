export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  cloneCar() {
    const clone = new this.constructor();
    Object.assign(clone, {
      _brand: this._brand,
      _motor: this._motor,
      _color: this._color,
    });
    return clone;
  }
}
