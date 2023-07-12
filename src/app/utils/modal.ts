export class Modal {
    
    static fecharModal(referencia:string) {
      let btn: HTMLElement = document.getElementById(referencia) as HTMLElement;
      btn.click();
    }
    
  }