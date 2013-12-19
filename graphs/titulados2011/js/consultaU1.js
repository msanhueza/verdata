/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreCarrera (sum(?total) AS ?totalTitulados) "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {{"+ 
"?s a di:Carrera."+
"?s ca:nombre ?nombreCarrera."+
"?s ca:dictadaPor ?universidad."+
"?universidad a di:Institucion."+
"?universidad in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
"?s ca:totalMujeresTituladas ?total."+
 "}"+
"UNION"+
"{"+
"?s a di:Carrera."+
"?s ca:nombre ?nombreCarrera."+
"?s ca:dictadaPor ?universidad."+
"?universidad a di:Institucion."+
"?universidad in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
"?s ca:totalHombresTitulados ?total."+
"}"+
"}}"+
"GROUP BY(?nombreCarrera)"+
"ORDER BY DESC(?totalTitulados)"+
"LIMIT 5",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.totalTitulados.value))
	    );
	});
    });

