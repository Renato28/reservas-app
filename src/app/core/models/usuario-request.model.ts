export type Perfil = 'ADMIN' | 'GERENTE' | 'RECEPCIONISTA' | 'CAMAREIRA' | 'HOSPEDE'

export interface UsuarioRequest {
    email: string;
    senha: string;
    perfil: Perfil;
}
