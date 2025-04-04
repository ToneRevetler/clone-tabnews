import { InternalServerError, MethodNotAllowed, ValidationError } from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicErrorObjetct = new MethodNotAllowed();
  response.status(publicErrorObjetct.statusCode).json(publicErrorObjetct);
}

function onErrorHandler(error, request, response) {

  if(error instanceof ValidationError){
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObjetct = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.log("\n Erro da implementação do next-connect");
  console.error(error);
  response.status(publicErrorObjetct.statusCode).json(publicErrorObjetct);
}

const controller = {
  errorHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
