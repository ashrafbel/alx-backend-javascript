export default class Building {
  constructor(sqft) {
    this._sqft = sqft;
    if (new.target === Building) {
      throw new Error('Cannot instantiate abstract class Building');
    }
  }

  get sqft() {
    return this._sqft;
  }

  evacuationWarningMessage() {
    throw new Error('Class extending Building must override evacuationWarningMessage');
  }
}

