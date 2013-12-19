/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreUniversidad (sum(?total) as ?totalTitulados)"+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+
	"{ "+
		"?s a di:Carrera."+
		"?s ca:dictadaPor ?universidad."+
		"?universidad a di:Institucion."+
		"?universidad in:nombre ?nombreUniversidad."+
		"?universidad in:clasificacion0 " + "\"UNIVERSIDAD\""+"@es. "+
		"?s ca:totalMujeresTituladas ?total."+
	"}"+
	"UNION"+
	"{"+
		"?s a di:Carrera."+
		"?s ca:dictadaPor ?universidad."+
		"?universidad a di:Institucion."+
		"?universidad in:nombre ?nombreUniversidad."+
		"?universidad in:clasificacion0 " + "\"UNIVERSIDAD\""+"@es. "+
		"?s ca:totalHombresTitulados ?total."+
	"}"+
	"}}"+
"GROUP BY (?nombreUniversidad)"+
"ORDER BY Desc(?totalTitulados)"+
"LIMIT 10 ",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreUniversidad.value))
		    .append($('<td>').text(value.totalTitulados.value))
	    );
	});
    });

