/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+
"PREFIX ci: <htpp://www.ejemplo.com/ciudad/>"+
"PREFIX re: <htpp://www.ejemplo.com/region/>"+

"SELECT ?subAreaOECD (sum(?titulados) AS ?totalTitulados) "+
"WHERE {"+
	"GRAPH <http://verdata.cl/graphs/titulados2011> {"+
		"{"+
		"?carrera a di:Carrera."+
		"?carrera ca:subAreaOECD ?subAreaOECD."+
		"?carrera ca:totalHombresTitulados ?titulados."+
		"?carrera ca:ciudad ?ciudad."+
		"?ciudad a di:Ciudad."+
		"?ciudad ci:pertenece ?region."+
		"?region a di:Region."+
		"?region re:nombre "+"\"VII REGION\""+"@es."+
		"}"+
		"UNION"+
		"{"+
		"?carrera a di:Carrera."+
		"?carrera ca:subAreaOECD ?subAreaOECD."+
		"?carrera ca:totalMujeresTituladas ?titulados."+
		"?carrera ca:ciudad ?ciudad."+
		"?ciudad a di:Ciudad."+
		"?ciudad ci:pertenece ?region."+
		"?region a di:Region."+
		"?region re:nombre "+"\"VII REGION\""+"@es."+
		"}"+
	"}"+
"}"+
"GROUP BY (?subAreaOECD)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.subAreaOECD.value))
		    .append($('<td>').text(value.totalTitulados.value))

	    );
	});
    });

