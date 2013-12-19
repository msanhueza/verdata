/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+
"PREFIX ci: <htpp://www.ejemplo.com/ciudad/>"+

"SELECT distinct ?ciudadNombre "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
"?s a di:Carrera."+
"?s ca:nombre ?nombreCarrera."+
"?s ca:dictadaPor ?q."+
"?s ca:ciudad ?ciudadCarrera."+
"?ciudadCarrera a di:Ciudad."+
"?ciudadCarrera ci:nombre ?ciudadNombre."+
"?q in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
 "}}",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.ciudadNombre.value))
	    );
	});
    });

