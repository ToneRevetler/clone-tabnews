function status(request, response) {
  response.status(200).json({ chave: "sou acima da media",item:"esse item é novo" });
}

export default status;
