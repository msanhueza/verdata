/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+
"PREFIX ci: <htpp://www.ejemplo.com/ciudad/>"+

"SELECT ?nombreInstitucion (count(?nombreCiudad) AS ?cantCiudades) "+
"WHERE{"+
	"SELECT DISTINCT ?nombreInstitucion ?nombreCiudad "+
	"WHERE {"+
		"GRAPH <http://verdata.cl/graphs/titulados2011> {"+
			"?carrera a di:Carrera."+
			"?carrera ca:dictadaPor ?inst."+
			"?carrera ca:ciudad ?ciudad."+
			"?ciudad a di:Ciudad."+
			"?ciudad ci:nombre ?nombreCiudad."+
			"?inst a di:Institucion."+
			"?inst in:nombre ?nombreInstitucion."+
	"}}"+
"}"+
"GROUP BY (?nombreInstitucion)"+
"ORDER BY DESC(?cantCiudades)"+
"LIMIT 1",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreInstitucion.value))
		    .append($('<td>').text(value.cantCiudades.value))
	    );
	});
    });

