export const WHATSAPP_NUMBER =
  process.env.WHATSAPP_NUMBER ?? '5567998973649'

export const WHATSAPP_LINKS = {
  paraEmpresas: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de um orçamento para atendimento externo para empresas.')}`,
  eventos: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de informações sobre eventos no Escritório de Bohemio.')}`,
  geral: `https://wa.me/${WHATSAPP_NUMBER}`,
}
