/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+
"PREFIX ci: <htpp://www.ejemplo.com/ciudad/>"+
"PREFIX re: <htpp://www.ejemplo.com/region/>"+

"SELECT ?nombreRegion (sum(?total) as ?totalTitulados)"+
"WHERE { "+
  "GRAPH <http://verdata.cl/graphs/titulados2011> { "+
  "{"+
    "?carrera a di:Carrera."+
    "?carrera ca:totalMujeresTituladas ?total."+
    "?carrera ca:ciudad ?ciudad."+
    "?ciudad a di:Ciudad."+
    "?ciudad ci:pertenece ?region."+
    "?region a di:Region."+
    "?region re:nombre ?nombreRegion."+
  "}"+
  "UNION"+
  "{"+
    "?carrera a di:Carrera."+
    "?carrera ca:totalHombresTitulados ?total."+
    "?carrera ca:ciudad ?ciudad."+
    "?ciudad a di:Ciudad."+
    "?ciudad ci:pertenece ?region."+
    "?region a di:Region."+
    "?region re:nombre ?nombreRegion."+
  "}"+
  "}"+
"}"+
"GROUP BY(?nombreRegion)"+
"ORDER BY(?nombreRegion)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreRegion.value))
		    .append($('<td>').text(value.totalTitulados.value))
	    );
	});
    });

