import { InternalServerError, MethodNotAllowed } from "infra/errors";

function onNoMatchHandler(request, response){
  const publicErrorObjetct = new MethodNotAllowed();
  response.status(publicErrorObjetct.statusCode).json(publicErrorObjetct);
}

function onErrorHandler(error, request, response){
  const publicErrorObjetct = new InternalServerError({
    cause: error,
    statusCode:error.statusCode,
  });
  console.log( "\n Erro da implementação do next-connect")
  response.status(publicErrorObjetct.statusCode).json(publicErrorObjetct);
  console.error(error);
}

const controller = { 
  errorHandler : {
    onNoMatch: onNoMatchHandler,
    onError :onErrorHandler  
  }
}

export default controller;