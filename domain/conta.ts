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
  if (!senhaValida(conta, senha)) throw new Error("Senha incorreta");
  if (!saldoSuficiente(conta, valor)) throw new Error("Saldo insuficiente");
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
  if (!senhaValida(conta, senha)) throw new Error("Senha incorreta");
  if (!valorDoChequeEspecialValido(valor))
    throw new Error("Valor maior que R$ 10.000");
  if (contaTemChequeEspecialContratado(conta))
    throw new Error("Conta já tem cheque especial contratado");
  return {
    ...conta,
    chequeEspecial: valor,
  };
}

const senhaValida = (conta: Conta, senha: string) => conta.senha === senha;
const saldoSuficiente = (conta: Conta, valor: number) => {
  const chequeEspecial = conta.chequeEspecial || 0;
  return conta.saldo + chequeEspecial >= valor;
};
const valorDoChequeEspecialValido = (valor: number) => valor <= 10000;
const contaTemChequeEspecialContratado = (conta: Conta) =>
  !!conta.chequeEspecial;
