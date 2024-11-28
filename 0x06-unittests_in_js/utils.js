class Utils {
  static calculateNumber(type, a, b) {
    if (type === 'SUM') {
      return Math.round(a) + Math.round(b);
    }
    throw new Error('Unsupported type');
  }
}

module.exports = Utils;

