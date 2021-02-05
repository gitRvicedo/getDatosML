let form = document.querySelector('#form');
let MostrarDatos = document.querySelector('.MostrarDatos');


form.addEventListener('submit',function(e){
    e.preventDefault();
    let formData = new FormData(form);
    
    let seller = formData.get('inpSeller');
    let site = formData.get('inpSite').toUpperCase();

    let url = `https://api.mercadolibre.com/sites/${site}/search?seller_id=${seller}`
    console.log(url)
    
    let datos = fetch(url);

        datos.then(valor=>{return valor.json()})
             .then(valor=>{
                 //console.log(valor);
                 let id = valor.results[0].id;
                 let title = valor.results[0].title;
                 let category_id = valor.results[0].category_id;
                 //let name = valor.available_filters[0].name;

                 console.log(id);
                 console.log(title);
                 console.log(category_id);

                var linea = "ID           |    TITLE                                     |     ID CATEGORY \n";
                for($i=0;$i<valor.results.length;$i++)
                    {
                   // MostrarDatos.innerHTML = MostrarDatos.innerHTML + valor.results[$i].id + " - " + valor.results[$i].title  + " - " + valor.results[$i].category_id +'<br/>';
                    var linea = linea + valor.results[$i].id + " | " + valor.results[$i].title  + " | " + valor.results[$i].category_id + '\n';
                    var file = new File([linea],"log.txt",{type:"text/plain;charset=utf-8"});
                     }
             
                var url  = window.URL.createObjectURL(file);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.className = "col";
                a.innerHTML = "Descarga Archivo Log.txt";
                a.download = file.name;
            
            })
             .catch()
})



