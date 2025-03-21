var Nodo = /** @class */ (function () {
    function Nodo(valor) {
        this.siguiente = null;
        this.prev = null;
        this.valor = valor;
    }
    return Nodo;
}());
var ListaDoblementeEnlazada = /** @class */ (function () {
    function ListaDoblementeEnlazada() {
        this.cabeza = null;
        this.cola = null;
        this.longitud = 0;
    }
    ListaDoblementeEnlazada.prototype.append = function (valor) {
        var nuevoNodo = new Nodo(valor);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        }
        else {
            nuevoNodo.prev = this.cola;
            if (this.cola)
                this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.longitud++;
    };
    ListaDoblementeEnlazada.prototype.prepend = function (valor) {
        var nuevoNodo = new Nodo(valor);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        }
        else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.prev = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        this.longitud++;
    };
    ListaDoblementeEnlazada.prototype.traverseToIndex = function (indice) {
        if (indice < 0 || indice >= this.longitud)
            return null;
        var nodoActual = this.cabeza;
        var i = 0;
        while (nodoActual && i !== indice) {
            nodoActual = nodoActual.siguiente;
            i++;
        }
        return nodoActual;
    };
    ListaDoblementeEnlazada.prototype.insert = function (indice, valor) {
        if (indice === 0) {
            this.prepend(valor);
        }
        else if (indice >= this.longitud) {
            this.append(valor);
        }
        else {
            var nuevoNodo = new Nodo(valor);
            var lider = this.traverseToIndex(indice - 1);
            if (!lider || !lider.siguiente)
                return;
            var seguidor = lider.siguiente;
            lider.siguiente = nuevoNodo;
            nuevoNodo.prev = lider;
            nuevoNodo.siguiente = seguidor;
            seguidor.prev = nuevoNodo;
            this.longitud++;
        }
    };
    ListaDoblementeEnlazada.prototype.remove = function (indice) {
        if (indice < 0 || indice >= this.longitud)
            return;
        if (indice === 0 && this.cabeza) {
            this.cabeza = this.cabeza.siguiente;
            if (this.cabeza)
                this.cabeza.prev = null;
        }
        else if (indice === this.longitud - 1 && this.cola) {
            this.cola = this.cola.prev;
            if (this.cola)
                this.cola.siguiente = null;
        }
        else {
            var lider = this.traverseToIndex(indice - 1);
            if (!lider || !lider.siguiente)
                return;
            var nodoAEliminar = lider.siguiente;
            var seguidor = nodoAEliminar.siguiente;
            if (seguidor)
                seguidor.prev = lider;
            lider.siguiente = seguidor;
        }
        this.longitud--;
    };
    ListaDoblementeEnlazada.prototype.imprimirLista = function () {
        var nodoActual = this.cabeza;
        var resultado = [];
        while (nodoActual) {
            resultado.push(String(nodoActual.valor));
            nodoActual = nodoActual.siguiente;
        }
        console.log(resultado.join("-"));
    };
    return ListaDoblementeEnlazada;
}());
var miLista = new ListaDoblementeEnlazada();
miLista.append(1);
miLista.append(2);
miLista.append(3);
miLista.append(4);
miLista.imprimirLista();
miLista.prepend(5);
miLista.prepend(6);
miLista.prepend(7);
miLista.imprimirLista();
miLista.insert(5, 8);
miLista.imprimirLista();
miLista.remove(7);
miLista.imprimirLista();
