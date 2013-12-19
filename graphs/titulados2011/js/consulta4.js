/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreUniversidad "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+
		"?universidad a di:Institucion."+
		"?universidad in:nombre ?nombreUniversidad."+
		"?universidad in:clasificacion2 " + "\"UNIVERSIDADES PARTICULARES CON APORTE\"" +"@es. "+
	"}}"+
"GROUP BY (?nombreUniversidad)"+
"ORDER BY Desc(?nombreUniversidad)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreUniversidad.value))
	    );
	});
    });

