export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('usuario'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.data.token);
        this.salvarUsuario(response.data);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('usuario', JSON.stringify(user));
    }

}
