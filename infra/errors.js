export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado ocorreu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.actions = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
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

export class MethodNotAllowed extends Error {
  constructor() {
    super("Método não permitido para esse endpoint");
    this.name = "MethodNotAllowed";
    this.message = "Método não permitido para esse endpoint";
    this.actions = "Verifique os métodos permitidos";
    this.statusCode = 405;
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

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento", {
      cause,
    });
    this.name = "ServiceError";
    this.actions = "Entre em contato com o suporte.";
    this.statusCode = 503;
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
export class ValidationError extends Error {
  constructor({ cause, message , actions}) {
    super(message || "Serviço indisponível no momento", {
      cause,
    });
    this.name = "ValidationError";
    this.actions = actions || "Entre em contato com o suporte.";
    this.statusCode = 400;
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
export class NotFoundError extends Error {
  constructor({ cause, message , actions}) {
    super(message || "Não foi possível encontrar esse recurso no sistema", {
      cause,
    });
    this.name = "NotFoundError";
    this.actions = actions || "Verifique os parâmetros enviados.";
    this.statusCode = 404;
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
