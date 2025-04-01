import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let updatedAtTextVersionDatabase = "Carregando...";
  let updatedAtTextMaxConnectionsDatabase = "Carregando...";
  let updatedAtTextOpenedConnectionsDatabase = "Carregando...";
  let updatedAtJSON = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    updatedAtTextVersionDatabase = data.dependencies.database.version;
    updatedAtTextOpenedConnectionsDatabase =
      data.dependencies.database.opened_connections;
    updatedAtTextMaxConnectionsDatabase =
      data.dependencies.database.max_connections;
    updatedAtJSON = JSON.stringify(data, null, 2);
  }

  return (
    <div>
      Última atualização: {updatedAtText}
      <h2>Banco de Dados</h2>
      <ul>
        <li>Versão:{updatedAtTextVersionDatabase}</li>
        <li>Abertas Conexões: {updatedAtTextOpenedConnectionsDatabase}</li>
        <li>Máxima Conexões: {updatedAtTextMaxConnectionsDatabase}</li>
      </ul>
      <hr></hr>
      <pre>{updatedAtJSON}</pre>
    </div>
  );
}
