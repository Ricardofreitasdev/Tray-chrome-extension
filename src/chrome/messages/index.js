export default class Messages {
  static SUCCESS_MESSAGES = {
    THEME_REMOVED: 'Tema removido com sucesso!',
    JS_REMOVED: 'Javascript externo removido com sucesso!',
    FB_CONVERSIONS_SUCCESS: 'Facebook Conversions Console aberto com sucesso!',
    CHANGE_URL: 'Ambiente atualizado com sucesso!',
    STORAGE: 'Storage limpo com sucesso!',
  };

  static ERROR_MESSAGES = {
    INVALID_PAGE: 'Esta página não é um tema',
    THEME_ALREADY_REMOVED: 'Esta página já está com o tema removido!',
    FB_CONVERSIONS_ERROR: 'O parâmetro do Facebook Conversions já esta na url',
    JS_ALREADY_REMOVED: 'Essa pagina já esta sem o javascript externo!',
    CHANGE_URL_ERROR: 'Não é possível aplicar o ambiente nessa página',
    STORAGE: 'Ocorreu um erro ao limpar o storage!',
  };

  static success(key) {
    return this.SUCCESS_MESSAGES[key] || 'Operação realizada com sucesso!';
  }

  static error(key) {
    return this.ERROR_MESSAGES[key] || 'Ocorreu algo inesperado.';
  }
}
