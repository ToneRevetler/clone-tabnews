import database from "infra/database";
import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";


beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST api/v1/user", () => {
  describe("Anonymous user", () => {
      test("With unique and valid data", async () => {

        const user = await database.query("SELECT * FROM users;");
        console.log(user.rows);
        const response = await fetch(
          "http://localhost:3000/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "tonerevetler",
              email: "contato@tone.com",
              password: "senha123"
            })
          },
        );
        expect(response.status).toBe(201);

        const responseBody = await response.json();

        expect(responseBody).toEqual(  {
          id: responseBody.id,
          username: 'tonerevetler',
          email: 'contato@tone.com',
          password: 'senha123',
          create_at:  responseBody.create_at,
          update_at:  responseBody.update_at,
        });

        expect(uuidVersion(responseBody.id)).toBe(4);
        expect(Date.parse(responseBody.create_at)).not.toBeNaN();
        expect(Date.parse(responseBody.update_at)).not.toBeNaN();
      });

      test("With duplicated 'email'", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "emailduplicado1",
              email: "duplicado@tone.com",
              password: "senha123"
            })
          },
        );

        expect(response1.status).toBe(201);

        const response2 = await fetch(
          "http://localhost:3000/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "emailduplicado2",
              email: "Duplicado@tone.com",
              password: "senha123"
            })
          },
        );

        expect(response2.status).toBe(400);

        const response2Body = await response2.json();

        expect(response2Body).toEqual({
          name: 'ValidationError',
          message: 'O Email informado já está sendo utilizado.',
          actions: 'Utilize outro email para continuar.',
          status_code: 400,
        });
      });

      test("With duplicated 'username'", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "usernameduplicado",
              email: "email@tone.com",
              password: "senha123"
            })
          },
        );

        expect(response1.status).toBe(201);

        const response2 = await fetch(
          "http://localhost:3000/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "usernameDuplicado",
              email: "email2@tone.com",
              password: "senha123"
            })
          },
        );

        expect(response2.status).toBe(400);

        const response2Body = await response2.json();

        expect(response2Body).toEqual({
          name: 'ValidationError',
          message: 'O Username informado já está sendo utilizado.',
          actions: 'Utilize outro username para continuar.',
          status_code: 400,
        });
      });
   
  });
});
