class BaseRoute {
  static methods() {
    // retorna todos os métodos que não são o construtor e privados(começam com "_")
    return Object.getOwnPropertyNames(this.prototype).filter(
      (method) => method !== 'constructor' && !method.startsWith('_')
    );
  }
}

module.exports = BaseRoute;
