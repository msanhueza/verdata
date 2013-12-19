/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+

"SELECT ?nombreCarrera ?nombreInstitucion ?totalEgresadas "+
"WHERE {"+ 
  "GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
  "{"+
    "?carrera a di:Carrera."+
    "?carrera ca:totalMujeresTituladas ?totalEgresadas."+
    "?carrera ca:nombre ?nombreCarrera."+
    "?carrera ca:dictadaPor ?inst."+
    "?inst a di:Institucion."+
    "?inst in:nombre ?nombreInstitucion."+
    "FILTER(?totalEgresadas >150)"+
  "}}"+
"}"+
"ORDER BY Desc(?totalEgresadas)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.nombreInstitucion.value))
		    .append($('<td>').text(value.totalEgresadas.value))
	    );
	});
    });

