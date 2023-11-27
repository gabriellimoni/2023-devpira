import { describe, expect, test } from "bun:test";
import { Conta, realizarSaque } from "../conta";

describe("Conta", () => {
  test("Deve reduzir o saldo quando realizado o saque", () => {
    const conta: Conta = {
      id: "qualquer-id",
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    const contaDepoisDoSaque = realizarSaque(conta, "qualquer-senha", 10);
    expect(contaDepoisDoSaque.saldo).toBe(90);
  });
});
