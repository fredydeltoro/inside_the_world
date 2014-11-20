function pasarVariables(pagina, valor) {
  pagina +="?";
  pagina += 'destino' + "=" + escape(valor);
  pagina = pagina.substring(0,pagina.length);
  location.href=pagina;
}