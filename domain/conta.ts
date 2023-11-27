export interface Conta {
  id: string;
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
  // TODO
  return {
    ...conta,
    saldo: conta.saldo - valor,
  };
}

export function realizarDeposito(conta: Conta, valor: number): Conta {
  return {} as Conta;
}

export function contratarChequeEspecial(
  conta: Conta,
  senha: string,
  valor: number
): Conta {
  return {} as Conta;
}
