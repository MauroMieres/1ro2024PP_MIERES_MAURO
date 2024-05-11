//1ro2024PP_MIERES_MAURO

document.addEventListener('DOMContentLoaded', () => {
  class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.fechaNacimiento = fechaNacimiento;
    }

    toString() {
      return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, fechaNacimiento: ${this.fechaNacimiento}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }

  class Ciudadano extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, dni) {
      super(id, nombre, apellido, fechaNacimiento);
      this.dni = dni;
    }

    toString() {
      return `${super.toString()}, DNI: ${this.dni}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }

  class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {
      super(id, nombre, apellido, fechaNacimiento);
      this.paisOrigen = paisOrigen;
    }

    toString() {
      return `${super.toString()}, paisOrigen: ${this.paisOrigen}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }


  const personas = [];
  const ciudadanos = [];
  const extranjeros = [];


  //puedo usar json parse pero por ahora uso esto directamente
  const data = [
    {
      id: 1,
      apellido: "Serrano",
      nombre: "Horacio",
      fechaNacimiento: 19840103,
      dni: 45876942
    },
    {
      id: 2,
      apellido: "Casas",
      nombre: "Julian",
      fechaNacimiento: 19990723,
      dni: 98536214
    },
    {
      id: 3,
      apellido: "Galeano",
      nombre: "Julieta",
      fechaNacimiento: 20081103,
      dni: 74859612
    },
    {
      id: 4,
      apellido: "Molina",
      nombre: "Juana",
      fechaNacimiento: 19681201,
      paisOrigen: "Paraguay"
    },
    {
      id: 5,
      apellido: "Barrichello",
      nombre: "Rubens",
      fechaNacimiento: 19720523,
      paisOrigen: "Brazil"
    },
    {
      id: 666,
      apellido: "Hkkinen",
      nombre: "Mika",
      fechaNacimiento: 19680928,
      paisOrigen: "Finlandia"
    }
  ];

  data.forEach((item) => {
    if ("paisOrigen" in item) {
      const extranjero = new Extranjero(item.id, item.nombre, item.apellido, item.fechaNacimiento, item.paisOrigen);
      extranjeros.push(extranjero);
    } else if ("dni" in item) {
      const ciudadano = new Ciudadano(item.id, item.nombre, item.apellido, item.fechaNacimiento, item.dni);
      ciudadanos.push(ciudadano);
    } else {
      const persona = new Persona(item.id, item.nombre, item.apellido, item.fechaNacimiento);
      personas.push(persona);
    }
  });

  console.log(personas);
  console.log(extranjeros);
  console.log(ciudadanos);

  let itemEditado = null;

  const datatable = document.getElementById('datatable');
  const filtro = document.getElementById('filtro');
  const checks = document.getElementById('checks');
  const header = document.getElementById('header');
  const dataDiv = document.getElementsByClassName('data')[0];
  const formCiudadano = document.getElementById('ciudadano');
  const formExtranjero = document.getElementById('extranjero');
  const formPersona = document.getElementById('persona');
  const AddButton = document.getElementById('AddButton');
  const btnCalcularPromedio = document.getElementById('btnCalcularPromedio');
  const resultadoPromedioPersonas = document.getElementById('resultadoPromedioPersonas');

  function cambiarValorBoton() {
    if (filtro.value === "extranjero") {
      AddButton.value = "Agregar extranjero";
    } else if (filtro.value === "ciudadano") {
      AddButton.value = "Agregar ciudadano";
    } else {
      AddButton.value = "Agregar persona";
    }
  }

  cambiarValorBoton();
  filtro.addEventListener("change", cambiarValorBoton);


  const formularioExtranjero = document.getElementById('formularioExtranjero');
  const formularioCiudadano = document.getElementById('formularioCiudadano');

  const formularioPersona = document.getElementById('formularioPersona');

  const AddButtonExtranjero = document.getElementById('AddButtonExtranjero');
  const AddButtonCiudadano = document.getElementById('AddButtonCiudadano');

  const AddButtonPersona = document.getElementById('AddButtonPersona');

  const DeleteButtonExtranjero = document.getElementById('DeleteButtonExtranjero');
  const DeleteButtonCiudadano = document.getElementById('DeleteButtonCiudadano');

  const DeleteButtonPersona = document.getElementById('DeleteButtonPersona');


  const CancelarButtonCiudadano = document.getElementById('CancelarButtonCiudadano');
  const CancelButtonExtranjero = document.getElementById('CancelButtonExtranjero');

  const CancelButtonPersona = document.getElementById('CancelButtonPersona');

  const showAdd = (tipo) => {

console.log("Estoy agregando");

    dataDiv.classList.add('hidden');

    console.log(tipo);
    switch (tipo) {
      case 'ciudadano':
        document.getElementById('idCiudadano').value = '';
        document.getElementById('idCiudadano').removeAttribute('disabled');
        document.getElementById('nombreCiudadano').value = '';
        document.getElementById('apellidoCiudadano').value = '';
        document.getElementById('fechaNacimientoCiudadano').value = '';
        document.getElementById('dniCiudadano').value = '';

        formCiudadano.classList.remove('hidden');
        formPersona.classList.add('hidden');
        formExtranjero.classList.add('hidden');
        break;

      case 'extranjero':
        document.getElementById('idExtranjero').value = '';
        document.getElementById('idExtranjero').removeAttribute('disabled');
        document.getElementById('nombreExtranjero').value = '';
        document.getElementById('apellidoExtranjero').value = '';
        document.getElementById('fechaNacimientoExtranjero').value = '';
        document.getElementById('paisOrigenExtranjero').value = '';

        formExtranjero.classList.remove('hidden');
        formPersona.classList.add('hidden');
        formCiudadano.classList.add('hidden');
        break;

      case 'persona':
        document.getElementById('idPersona').value = '';
        document.getElementById('idPersona').removeAttribute('disabled');
        document.getElementById('nombrePersona').value = '';
        document.getElementById('apellidoPersona').value = '';
        document.getElementById('fechaNacimientoPersona').value = '';

        formCiudadano.classList.add('hidden');
        formExtranjero.classList.add('hidden');
        formPersona.classList.remove('hidden');
        break;

    }

  }

  const showData = () => {
    dataDiv.classList.remove('hidden');
    formCiudadano.classList.add('hidden');
    formExtranjero.classList.add('hidden');
    formPersona.classList.add('hidden');
  }

  AddButton.addEventListener('click', () => {
    showAdd(filtro.value);
  });

  CancelarButtonCiudadano.addEventListener('click', () => {
    resetAfterForm(filtro.value);
  });

  CancelButtonExtranjero.addEventListener('click', () => {
    resetAfterForm(filtro.value);
  });

  CancelButtonPersona.addEventListener('click', () => {
    resetAfterForm(filtro.value);
  });


  const setChecks = (tipo) => {
    const defaultChecks = `
      <input type="checkbox" id="chkId" checked> <label for="chkId">ID</label>
      <input type="checkbox" id="chkNombre" checked> <label for="chkNombre">Nombre</label>
      <input type="checkbox" id="chkApellido" checked> <label for="chkApellido">Apellido</label>
      <input type="checkbox" id="chkFechaNacimiento" checked> <label for="chkFechaNacimiento">Fecha de Nacimiento</label>
    `;

    switch (tipo) {
      case 'persona':
        checks.innerHTML = defaultChecks;
        break;
      case 'extranjero':
        checks.innerHTML = `
          ${defaultChecks}
          <input type="checkbox" id="chkPaisOrigen" checked> <label for="chkPaisOrigen">Pais de origen</label>
        `;
        break;
      default:
        checks.innerHTML = `
          ${defaultChecks}
          <input type="checkbox" id="chkDni" checked> <label for="chkDni">DNI</label>
        `;
        break;
    }

    const cbox = document.querySelectorAll('input[type=checkbox]');
    for (const element of cbox) {
      element.addEventListener("click", (e) => {
        resetTable();
        armarheader(filtro?.value);
        agregarFilas(filtro?.value);
      });
    }
  }


  const armarheader = (tipo) => {
    const header = document.getElementById('header');
    if (header) {
        const chkId = document.getElementById('chkId');
        const chkNombre = document.getElementById('chkNombre');
        const chkApellido = document.getElementById('chkApellido');
        const chkFechaNacimiento = document.getElementById('chkFechaNacimiento');
        const chkPaisOrigen = document.getElementById('chkPaisOrigen');
        const chkDni = document.getElementById('chkDni');

        const crearheader = (titulo) => {
            const th = document.createElement('th');
            th.innerHTML = titulo;
            return th;
        }

        if (chkId) chkId.checked ? header.append(crearheader('ID')) : null;
        if (chkNombre) chkNombre.checked ? header.append(crearheader('Nombre')) : null;
        if (chkApellido) chkApellido.checked ? header.append(crearheader('Apellido')) : null;
        if (chkFechaNacimiento) chkFechaNacimiento.checked ? header.append(crearheader('Fecha de nacimiento')) : null;

        if (tipo === 'extranjero') {
            if (chkPaisOrigen) chkPaisOrigen.checked ? header.append(crearheader('Pais de origen')) : null;
        } else if (tipo === 'ciudadano') {
            if (chkDni) chkDni.checked ? header.append(crearheader('DNI')) : null;
        } else if (tipo === 'persona') {

        }
    }
}

  const agregarFilas = (tipo) => {
    const datatable = document.getElementById('datatable');
    const chkId = document.getElementById('chkId').checked;
    const chkNombre = document.getElementById('chkNombre').checked;
    const chkApellido = document.getElementById('chkApellido').checked;
    const chkFechaNacimiento = document.getElementById('chkFechaNacimiento').checked;

    const chkPaisOrigen = document.getElementById('chkPaisOrigen')?.checked;
    const chkDni = document.getElementById('chkDni')?.checked;


    const source = tipo === 'persona' ? personas : (tipo === 'extranjero' ? extranjeros : ciudadanos);

    source.forEach(item => {
      const fila = document.createElement('tr');
      let data = '';
      if (chkId) data += `<td>${item.id}</td>`;
      if (chkNombre) data += `<td>${item.nombre}</td>`;
      if (chkApellido) data += `<td>${item.apellido}</td>`;
      if (chkFechaNacimiento) data += `<td>${item.fechaNacimiento}</td>`;
      if (chkPaisOrigen && tipo === 'extranjero') data += `<td>${item.paisOrigen}</td>`;
      if (chkDni && tipo === 'ciudadano') data += `<td>${item.dni}</td>`;

      fila.innerHTML = data;

      fila.addEventListener('click', () => {
        selectRow(item, tipo);
      });

      datatable.appendChild(fila);
    });
}

  const resetTable = () => {
    const datatable = document.getElementById('datatable');
    if (datatable) {
      datatable.innerHTML = '';
    }
    const header = document.getElementById('header');
    if (header) {
      header.innerHTML = ''; 
    }
  }

  const resetAfterForm = (tipo) => {

    resetTable();
    setChecks(tipo);
    armarheader(tipo);
    agregarFilas(tipo);
    showData();
    itemEditado = null;
  }

  const selectRow = (item, tipo) => {
    itemEditado = item;

    showAdd(tipo);

    if (tipo === 'persona') {
      formularioPersona.idPersona.value = item.id;
      document.getElementById('idPersona').setAttribute('disabled', 'disabled');
      formularioPersona.nombrePersona.value = item.nombre;
      formularioPersona.apellidoPersona.value = item.apellido;
      formularioPersona.fechaNacimientoPersona.value = item.fechaNacimiento;
    }
    else if (tipo === 'extranjero') {
      formularioExtranjero.idExtranjero.value = item.id;
      document.getElementById('idExtranjero').setAttribute('disabled', 'disabled');
      formularioExtranjero.nombreExtranjero.value = item.nombre;
      formularioExtranjero.apellidoExtranjero.value = item.apellido;
      formularioExtranjero.fechaNacimientoExtranjero.value = item.fechaNacimiento;
      formularioExtranjero.paisOrigenExtranjero.value = item.paisOrigen;
    } else {
      formularioCiudadano.idCiudadano.value = item.id;
      document.getElementById('idCiudadano').setAttribute('disabled', 'disabled');
      formularioCiudadano.nombreCiudadano.value = item.nombre;
      formularioCiudadano.apellidoCiudadano.value = item.apellido;
      formularioCiudadano.fechaNacimientoCiudadano.value = item.fechaNacimiento;
      formularioCiudadano.dniCiudadano.value = item.dni;
    }
  }

  const agregarFila = (tipo) => {
    if (tipo === 'extranjero') {
      const extranjeroNuevo = new Extranjero(
        formularioExtranjero.idExtranjero.value,
        formularioExtranjero.nombreExtranjero.value,
        formularioExtranjero.apellidoExtranjero.value,
        formularioExtranjero.fechaNacimientoExtranjero.value,
        formularioExtranjero.paisOrigenExtranjero.value
      );
      extranjeros.push(extranjeroNuevo);

    } else if (tipo === 'ciudadano'){
      const ciudadanoNuevo = new Ciudadano(
        formularioCiudadano.idCiudadano.value,
        formularioCiudadano.nombreCiudadano.value,
        formularioCiudadano.apellidoCiudadano.value,
        formularioCiudadano.fechaNacimientoCiudadano.value,
        formularioCiudadano.dniCiudadano.value
      );
      ciudadanos.push(ciudadanoNuevo);
    } else{
      const personaNueva = new Persona(
        formularioPersona.idPersona.value,
        formularioPersona.nombrePersona.value,
        formularioPersona.apellidoPersona.value,
        formularioPersona.fechaNacimientoPersona.value);
        personas.push(personaNueva);
    }
  }

  if (AddButtonExtranjero) {
    AddButtonExtranjero.addEventListener('click', (e) => {
      e.preventDefault();
      const id = formularioExtranjero.idExtranjero.value;
      const nombre = formularioExtranjero.nombreExtranjero.value;
      const apellido = formularioExtranjero.apellidoExtranjero.value;
      const fechaNacimiento = formularioExtranjero.fechaNacimientoExtranjero.value;
      const paisOrigen = formularioExtranjero.paisOrigenExtranjero.value;

      document.getElementById('errorMensajeExtranjero').textContent = '';

      const inputId = formularioExtranjero.idExtranjero;
      const inputNombre = formularioExtranjero.nombreExtranjero;
      const inputApellido = formularioExtranjero.apellidoExtranjero;
      const inputFechaNacimiento = formularioExtranjero.fechaNacimientoExtranjero;
      const inputPaisOrigen = formularioExtranjero.paisOrigenExtranjero;

      inputId.classList.remove('error-input');
      inputNombre.classList.remove('error-input');
      inputApellido.classList.remove('error-input');
      inputFechaNacimiento.classList.remove('error-input');
      inputPaisOrigen.classList.remove('error-input');

      if (!id) {
        document.getElementById('errorMensajeExtranjero').textContent += 'El ID es obligatorio. ';
        inputId.classList.add('error-input');
      }

      if (!nombre) {
        document.getElementById('errorMensajeExtranjero').textContent += 'El nombre es obligatorio. ';
        inputNombre.classList.add('error-input');
      }

      if (!apellido ) {
        document.getElementById('errorMensajeExtranjero').textContent += 'El apellido es obligatorio. ';
        inputApellido.classList.add('error-input');
      }

      if (!fechaNacimiento) {
        document.getElementById('errorMensajeExtranjero').textContent += 'La fecha no es valida. ';
        inputFechaNacimiento.classList.add('error-input');
      }

      if (!paisOrigen) {
        document.getElementById('errorMensajeExtranjero').textContent += 'El pais es obligatorio. ';
        inputPaisOrigen.classList.add('error-input');
      }

      if (document.getElementById('errorMensajeExtranjero').textContent !== '') {
        return;
      }

      if (itemEditado) {
        itemEditado.id = id;
        itemEditado.nombre = nombre;
        itemEditado.apellido = apellido;
        itemEditado.fechaNacimiento = fechaNacimiento;
        itemEditado.dni = paisOrigen;
      } else {
        const nuevoExtranjero = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen);
        extranjeros.push(nuevoExtranjero);
      }
      formularioExtranjero.reset();
      resetAfterForm('extranjero');
    });
  }

  if (AddButtonCiudadano) {
    AddButtonCiudadano.addEventListener('click', (e) => {
      e.preventDefault();
      
      const id = formularioCiudadano.idCiudadano.value;
      const nombre = formularioCiudadano.nombreCiudadano.value;
      const apellido = formularioCiudadano.apellidoCiudadano.value;
      const fechaNacimiento = formularioCiudadano.fechaNacimientoCiudadano.value;
      const dni = formularioCiudadano.dniCiudadano.value;
  
      document.getElementById('errorMensajeCiudadano').textContent = '';
  
      const inputId = formularioCiudadano.idCiudadano;
      const inputNombre = formularioCiudadano.nombreCiudadano;
      const inputApellido = formularioCiudadano.apellidoCiudadano;
      const inputFechaNacimiento = formularioCiudadano.fechaNacimientoCiudadano;
      const inputDni = formularioCiudadano.dniCiudadano;

      inputId.classList.remove('error-input');
      inputNombre.classList.remove('error-input');
      inputApellido.classList.remove('error-input');
      inputFechaNacimiento.classList.remove('error-input');
      inputDni.classList.remove('error-input');
  
      if (!id) {
        document.getElementById('errorMensajeCiudadano').textContent += 'El ID es obligatorio. ';
        inputId.classList.add('error-input');
      }

      if (!nombre) {
        document.getElementById('errorMensajeCiudadano').textContent += 'El nombre es obligatorio. ';
        inputNombre.classList.add('error-input');
      }

      if (!apellido || isNaN(apellido) || apellido <= 1885) {
        document.getElementById('errorMensajeCiudadano').textContent += 'El apellido es obligatorio. ';
        inputApellido.classList.add('error-input');
      }

      if (!fechaNacimiento || isNaN(fechaNacimiento) || fechaNacimiento <= 0) {
        document.getElementById('errorMensajeCiudadano').textContent += 'La fecha es invalida. ';
        inputFechaNacimiento.classList.add('error-input');
      }

      if (!dni) {
        document.getElementById('errorMensajeCiudadano').textContent += 'El DNI es obligatorio ';
        inputDni.classList.add('error-input');
      }

      if (document.getElementById('errorMensajeCiudadano').textContent !== '') {
        return;
      }

      if (itemEditado) {
        itemEditado.id = id;
        itemEditado.nombre = nombre;
        itemEditado.apellido = apellido;
        itemEditado.fechaNacimiento = fechaNacimiento;
        itemEditado.dni = dni;
      } else {
        const ciudadanoNuevo = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
        ciudadanos.push(ciudadanoNuevo);
      }
      formularioCiudadano.reset();

      resetAfterForm('ciudadano');
    });
  }

  if (AddButtonPersona) {
    AddButtonPersona.addEventListener('click', (e) => {
      e.preventDefault();

      const id = formularioPersona.idPersona.value;
      const nombre = formularioPersona.nombrePersona.value;
      const apellido = formularioPersona.apellidoPersona.value;
      const fechaNacimiento = formularioPersona.fechaNacimientoPersona.value;

      document.getElementById('errorMensajePersona').textContent = '';

      const inputId = formularioPersona.idPersona;
      const inputNombre = formularioPersona.nombrePersona;
      const inputApellido = formularioPersona.apellidoPersona;
      const inputFechaNacimiento = formularioPersona.fechaNacimientoPersona;

      inputId.classList.remove('error-input');
      inputNombre.classList.remove('error-input');
      inputApellido.classList.remove('error-input');
      inputFechaNacimiento.classList.remove('error-input');

      if (!id) {
        document.getElementById('errorMensajePersona').textContent += 'El ID es obligatorio. ';
        inputId.classList.add('error-input');
      }

      if (!nombre) {
        document.getElementById('errorMensajePersona').textContent += 'El nombre es obligatorio. ';
        inputNombre.classList.add('error-input');
      }

      if (!apellido) {
        document.getElementById('errorMensajePersona').textContent += 'El apellido es obligatorio. ';
        inputApellido.classList.add('error-input');
      }

      if (!fechaNacimiento) {
        console.log("Entre aca");
        document.getElementById('errorMensajePersona').textContent += 'Le fecha es invalida ';
        inputFechaNacimiento.classList.add('error-input');
      }

      console.log("YA CASI TERMINO");

      if (itemEditado) {
    
        itemEditado.id = id;
        itemEditado.nombre = nombre;
        itemEditado.apellido = apellido;
        itemEditado.fechaNacimiento = fechaNacimiento;
      } else {
        const nuevaPersona = new Persona(id, nombre, apellido, fechaNacimiento);
        personas.push(nuevaPersona);
      }
      formularioPersona.reset();
      resetAfterForm('persona');
    }
    );
  }

  if (DeleteButtonExtranjero) {
    DeleteButtonExtranjero.addEventListener('click', () => {
      if (itemEditado) {
        const index = extranjeros.findIndex(x => x.id === itemEditado.id);
        extranjeros.splice(index, 1);
        resetAfterForm('extranjero');
      }
    });
  }

  if (DeleteButtonCiudadano) {
    DeleteButtonCiudadano.addEventListener('click', () => {
      if (itemEditado) {
        const index = ciudadanos.findIndex(x => x.id === itemEditado.id);
        ciudadanos.splice(index, 1);
        resetAfterForm('ciudadano');
      }
    });
  }

  if (DeleteButtonPersona) {
    DeleteButtonPersona.addEventListener('click', () => {
      if (itemEditado) {
        const index = personas.findIndex(x => x.id === itemEditado.id);
        personas.splice(index, 1);
        resetAfterForm('persona');
      }
    });
  }

  if (filtro) {
    filtro.addEventListener('change', () => {
      resetTable();
      setChecks(filtro.value);
      armarheader(filtro.value);
      agregarFilas(filtro.value);
      resultadoPromedioPersonas.innerHTML = '';
    });
  }

  btnCalcularPromedio.addEventListener("click", function () {
    let promedio = 0;

    switch(filtro.value){
      case 'aereo':
        promedio = aereo.reduce((suma, item) => suma + item.fechaNacimiento, 0) / aereo.length;
        break;

        case 'vehiculo':
          promedio = vehiculo.reduce((suma, item) => suma + item.fechaNacimiento, 0) / vehiculo.length;
        break;

        case 'terrestre':
          promedio = terrestre.reduce((suma, item) => suma + item.fechaNacimiento, 0) / terrestre.length;
        break;
    }
    resultadoPromedioPersonas.innerHTML = `El promedio de velocidad es: ${promedio}`;
  });

  //filtro.value = "persona";
  armarheader('persona');
  agregarFilas('persona');
  setChecks('persona');
  filtro.value = "persona";
  cambiarValorBoton();

});
