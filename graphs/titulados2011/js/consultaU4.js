/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
"PREFIX ca: <htpp://www.ejemplo.com/carrera/>"+
"PREFIX in: <htpp://www.ejemplo.com/institucion/>"+
"PREFIX di: <htpp://www.ejemplo.com/diccionario/>"+
"PREFIX ci: <htpp://www.ejemplo.com/ciudad/>"+

"SELECT ?nombreCarrera ?carreraDuracion ?promDuracion "+
    "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
"?s a di:Carrera."+
"?s ca:nombre ?nombreCarrera."+
"?s ca:dictadaPor ?q."+
"?s ca:duracionTotal ?carreraDuracion."+
"?q in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
"{"+
   "SELECT (avg(?carreraDuracion) AS ?promDuracion) "+
      "WHERE { GRAPH <http://verdata.cl/graphs/titulados2011> {"+ 
         "?s a di:Carrera."+
         "?s ca:nombre ?nombreCarrera."+
         "?s ca:dictadaPor ?q."+
         "?s ca:duracionTotal ?carreraDuracion."+
         "?q in:nombre "+"\"UNIVERSIDAD DE TALCA\""+"@es."+
      "}}"+

"}"+
"}}"+ 
"HAVING(?carreraDuracion > ?promDuracion)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.nombreCarrera.value))
		    .append($('<td>').text(value.carreraDuracion.value))
		    .append($('<td>').text(value.promDuracion.value))
	    );
	});
    });

