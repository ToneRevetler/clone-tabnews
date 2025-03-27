const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      console.log("🔴 Não está aceitando connections");
      process.stdout.write("Tentando novamente...");
      checkPostgres();
      return;
    }

    console.log("🟢 Postgres está pronto!");
  }
}

console.log("🟡 Aguardando...");
checkPostgres();
