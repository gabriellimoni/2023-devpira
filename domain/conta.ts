export interface Conta {
  agencia: string;
  numero: string;
  senha: string;
  saldo: number;
}

export function realizarSaque(
  conta: Conta,
  senha: string,
  valor: number
): Conta {
  if (conta.senha !== senha) throw new Error("Senha incorreta");
  if (conta.saldo < valor) throw new Error("Saldo insuficiente");
  return {
    ...conta,
    saldo: conta.saldo - valor,
  };
}

export function contratarChequeEspecial(
  conta: Conta,
  senha: string,
  valor: number
): Conta {
  return {} as Conta;
}
