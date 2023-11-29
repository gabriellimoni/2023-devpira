import { describe, expect, test } from "bun:test";
import { Conta, contratarChequeEspecial, realizarSaque } from "../conta";

describe("Realizar saque", () => {
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

  test("Saque convencional com saldo na conta, valor acima do saldo e cheque especial no limite", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
      chequeEspecial: 20,
    };
    const resultado = realizarSaque(conta, "qualquer-senha", 120);
    expect(resultado.saldo).toBe(-20);
  });
  test("Saque convencional sem saldo na conta, valor acima do saldo e cheque especial no limite", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 0,
      senha: "qualquer-senha",
      chequeEspecial: 20,
    };
    const resultado = realizarSaque(conta, "qualquer-senha", 20);
    expect(resultado.saldo).toBe(-20);
  });
  test("Saque convencional sem saldo na conta, valor acima do saldo e do cheque especial", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 0,
      senha: "qualquer-senha",
      chequeEspecial: 20,
    };
    expect(() => realizarSaque(conta, "qualquer-senha", 21)).toThrow(
      new Error("Saldo insuficiente")
    );
  });
  test("Saque convencional con saldo na conta, valor acima do saldo e do cheque especial", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
      chequeEspecial: 20,
    };
    expect(() => realizarSaque(conta, "qualquer-senha", 121)).toThrow(
      new Error("Saldo insuficiente")
    );
  });

  test("Saque com valor negativo", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => realizarSaque(conta, "qualquer-senha", -1)).toThrow(
      new Error("Valor de saque inválido")
    );
  });
  test("Saque com valor zero", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => realizarSaque(conta, "qualquer-senha", 0)).toThrow(
      new Error("Valor de saque inválido")
    );
  });
});

describe("Contratar cheque especial", () => {
  test("Contratar cheque especial convencional", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    const resultado = contratarChequeEspecial(conta, "qualquer-senha", 5000);
    expect(resultado.chequeEspecial).toBe(5000);
  });
  test("Contratar cheque especial convencional no limite", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    const resultado = contratarChequeEspecial(conta, "qualquer-senha", 10000);
    expect(resultado.chequeEspecial).toBe(10000);
  });
  test("Contratar cheque especial valor excedente", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() =>
      contratarChequeEspecial(conta, "qualquer-senha", 10001)
    ).toThrow(new Error("Valor maior que R$ 10.000"));
  });
  test("Contratar cheque especial mas já tem contratado", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
      chequeEspecial: 100,
    };
    expect(() =>
      contratarChequeEspecial(conta, "qualquer-senha", 5000)
    ).toThrow(new Error("Conta já tem cheque especial contratado"));
  });
  test("Contratar cheque especial com senha errada", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => contratarChequeEspecial(conta, "senha-errada", 5000)).toThrow(
      new Error("Senha incorreta")
    );
  });
  test("Contratar cheque especial com senha errada e já tem contratado", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
      chequeEspecial: 100,
    };
    expect(() => contratarChequeEspecial(conta, "senha-errada", 5000)).toThrow(
      new Error("Senha incorreta")
    );
  });
  test("Contratar cheque especial com senha errada acima do limite", () => {
    const conta: Conta = {
      agencia: "qualquer-agencia",
      numero: "qualquer-numero",
      saldo: 100,
      senha: "qualquer-senha",
    };
    expect(() => contratarChequeEspecial(conta, "senha-errada", 10001)).toThrow(
      new Error("Senha incorreta")
    );
  });
});
