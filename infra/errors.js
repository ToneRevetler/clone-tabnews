export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado ocorreu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.actions = "Entre em contato com o suporte."
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      actions: this.actions,
      status_code: this.statusCode,
    };
  }
}
