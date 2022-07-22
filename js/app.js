const ingresos = [
    new Ingreso("Sueldo", 300.00),
    new Ingreso("Venta de coche", 20000),
    new Ingreso("asdad", 32)
];

const egresos = [
    new Egreso("Renta", 300),
    new Egreso("Viveres", 3200),
    new Egreso("asd", 32)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        console.log(ingreso.valor)
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;

    }
    return totalEgreso;
}
let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatPorcentaje(porcentaje);
    document.getElementById("ingresos").innerHTML = formatMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatMoneda(totalEgresos());
}

let formatMoneda = (valor) => {
    return valor.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:2})
}

let formatPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {style:"percent", minimumFractionDigits:2})
}

const cargarIngresos = () => {
    let ingresosHTML = "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);

    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></ion>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarEgresos = () =>{
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let porcetanjeE = egreso.valor / totalEgresos()
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatPorcentaje(porcetanjeE)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})"></ion>
                </button>
            </div>
        </div>
    </div>
    `
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value !== "" && valor.value !== ""){
        if (tipo.value == "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            console.log(descripcion)
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value == "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    
    }
} 