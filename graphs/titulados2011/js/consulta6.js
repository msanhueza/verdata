/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreCarrera (sum(?total) AS ?totalEgr) "+
"WHERE {"+ 
	"GRAPH <http://verdata.cl/graphs/titulados2011> {"+
	"{"+
		"?carrera a di:Carrera."+
		"?carrera ca:totalMujeresTituladas ?total."+
		"?carrera ca:nombre ?nombreCarrera."+
	"}"+
	"UNION"+
	"{"+
		"?carrera a di:Carrera."+
		"?carrera ca:totalHombresEgresados ?total."+
		"?carrera ca:nombre ?nombreCarrera."+
	"}"+
	"{"+
	"SELECT (avg(?totalCarrera) as ?Prom) "+
	"WHERE{"+
		"SELECT ?nombreCarrera(sum(?totalE) as ?totalCarrera) "+
		"WHERE {"+ 
			"GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
			"{"+
				"?carrera a di:Carrera."+
				"?carrera ca:totalMujeresTituladas ?totalE."+
				"?carrera ca:nombre ?nombreCarrera."+
			"}"+
			"UNION"+
			"{"+
				"?carrera a di:Carrera."+
				"?carrera ca:totalHombresEgresados ?totalE."+
				"?carrera ca:nombre ?nombreCarrera."+
			"}"+
			"}"+
		"}"+
		"GROUP BY (?nombreCarrera)"+
	"}"+
	"}"+
	"FILTER(?total>?Prom)"+
	"}"+
"}"+
"GROUP BY(?nombreCarrera)"+
"ORDER BY DESC(?totalEgr)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.totalEgr.value))
	    );
	});
    });

