// Obtener la lista de pendientes del localStorage (si existe)
const listaDePendientes = localStorage.getItem("listaDePendientes");
let pendientes = listaDePendientes ? JSON.parse(listaDePendientes) : [];

// Función para renderizar la lista de pendientes en el DOM
const renderizarLista = () => {
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; // Limpiamos la lista antes de agregar los nuevos elementos

  pendientes.forEach((pendiente, index) => {
    const li = document.createElement("li");
    li.textContent = pendiente;

    // Botón para eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarTarea(index);
    li.appendChild(btnEliminar);

    // Botón para editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarTarea(index);
    li.appendChild(btnEditar);

    lista.appendChild(li);
  });
};

// Función para agregar una tarea o actualizar si es edición
const agregarTarea = () => {
  const tareaInput = document.getElementById("tarea");
  const tarea = tareaInput.value.trim();
  const indiceTarea = document.getElementById("indiceTarea").value;

  if (tarea) {
    if (indiceTarea === "-1") {
      // Si es -1, es una nueva tarea
      pendientes.push(tarea);
    } else {
      // Si no, es una actualización de tarea existente
      pendientes[indiceTarea] = tarea;
      document.getElementById("btnAgregar").textContent = "Añadir tarea"; // Cambiamos el botón nuevamente a 'Añadir'
    }

    localStorage.setItem("listaDePendientes", JSON.stringify(pendientes)); // Guardamos la lista actualizada en el localStorage
    tareaInput.value = ""; // Limpiamos el input
    document.getElementById("indiceTarea").value = "-1"; // Reiniciamos el valor del índice
    renderizarLista(); // Renderizamos la lista actualizada
  } else {
    alert("Por favor ingresa una tarea");
  }
};

// Función para eliminar una tarea
const eliminarTarea = (index) => {
  pendientes.splice(index, 1); // Eliminamos la tarea en el índice dado
  localStorage.setItem("listaDePendientes", JSON.stringify(pendientes)); // Guardamos la lista actualizada en el localStorage
  renderizarLista(); // Renderizamos la lista actualizada
};

// Función para editar una tarea
const editarTarea = (index) => {
  const tareaInput = document.getElementById("tarea");
  tareaInput.value = pendientes[index]; // Cargamos la tarea en el input
  document.getElementById("indiceTarea").value = index; // Guardamos el índice de la tarea que vamos a editar
  document.getElementById("btnAgregar").textContent = "Actualizar tarea"; // Cambiamos el texto del botón a 'Actualizar'
};

// Renderizamos la lista al cargar la página
renderizarLista();
