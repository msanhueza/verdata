/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreCarrera ?totalMujeresTituladas ?totalHombresTitulados "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {{"+ 
"?s a di:Carrera."+
"?s ca:nombre ?nombreCarrera."+
"?s ca:dictadaPor ?universidad."+
"?universidad a di:Institucion."+
"?universidad in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
"?s ca:totalMujeresTituladas ?totalMujeresTituladas."+
"?s ca:totalHombresTitulados ?totalHombresTitulados."+
"}}"+
"}"+
"HAVING(?totalMujeresTituladas > ?totalHombresTitulados)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.totalMujeresTituladas.value))
		    .append($('<td>').text(value.totalHombresTitulados.value))
	    );
	});
    });

