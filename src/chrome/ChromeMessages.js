export class ChromeMessages {
  static SUCCESS_MESSAGES = {
    THEME_REMOVED: "Tema removido com sucesso!",
    FB_CONVERSIONS_SUCCESS: "Facebook Conversions Console aberto com sucesso!",
  };

  static ERROR_MESSAGES = {
    INVALID_PAGE: "Esta página não é um tema",
    THEME_ALREADY_REMOVED: "Esta página já está com o tema removido!",
    FB_CONVERSIONS_ERROR: "O parâmetro do Facebook Conversions já esta na url",
  };

  static getSuccessMessage(key) {
    return this.SUCCESS_MESSAGES[key] || "Operação realizada com sucesso!";
  }

  static getErrorMessage(key) {
    return this.ERROR_MESSAGES[key] || "Ocorreu algo inesperado.";
  }
}
