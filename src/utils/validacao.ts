// Validacoes

// Valida se o email tem formato correto
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Valida se o nome não contém números
export function validarNome(nome: string): boolean {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(nome) && nome.length >= 2;
}

// Valida telefone 
export function validarTelefone(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

// Valida senha mínimo 6 caracteres
export function validarSenha(senha: string): boolean {
  return senha.length >= 6;
}
