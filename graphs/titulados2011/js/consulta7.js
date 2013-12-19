/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreCarrera (count(?universidad) as ?total) "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
"?carrera a di:Carrera."+
"?carrera ca:nombre ?nombreCarrera."+
"?carrera ca:dictadaPor ?universidad."+
"?universidad a di:Institucion."+
 "}}"+

"GROUP BY (?nombreCarrera)"+
"ORDER BY DESC(?total)"+
"LIMIT 1",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.total.value))
	    );
	});
    });

