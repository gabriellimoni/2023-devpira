export interface Conta {
  agencia: string;
  numero: string;
  senha: string;
  saldo: number;
  chequeEspecial?: number;
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
  if (conta.senha !== senha) throw new Error("Senha incorreta");
  if (valor > 10000) throw new Error("Valor maior que R$ 10.000");
  if (conta.chequeEspecial)
    throw new Error("Conta já tem cheque especial contratado");
  return {
    ...conta,
    chequeEspecial: valor,
  };
}
