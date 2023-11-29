import { describe, expect, test } from "bun:test";
import { Conta, realizarSaque } from "../conta";

describe("Conta", () => {
  test("Saque convencional com saldo na conta", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    const resultado = realizarSaque(conta, "qualquer-senha", 20);
    expect(resultado.saldo).toBe(80);
  });
  test("Saque convencional com saldo no limite", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    const resultado = realizarSaque(conta, "qualquer-senha", 100);
    expect(resultado.saldo).toBe(0);
  });
  test("Saque com saldo menor que o valor desejado", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => realizarSaque(conta, "qualquer-senha", 101)).toThrow(
      new Error("Saldo insuficiente")
    );
  });
  test("Saque com senha errada", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => realizarSaque(conta, "senha-errada", 20)).toThrow(
      new Error("Senha incorreta")
    );
  });
  test("Saque com senha errada e saldo insuficiente", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => realizarSaque(conta, "senha-errada", 101)).toThrow(
      new Error("Senha incorreta")
    );
  });
});
