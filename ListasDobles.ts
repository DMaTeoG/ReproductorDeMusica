class Nodo<T> {
    valor: T;
    siguiente: Nodo<T> | null = null;
    prev: Nodo<T> | null = null;

    constructor(valor: T) {
        this.valor = valor;
    }
}

class ListaDoblementeEnlazada<T> {
    cabeza: Nodo<T> | null = null;
    cola: Nodo<T> | null = null;
    longitud: number = 0;

    append(valor: T): void {
        const nuevoNodo = new Nodo(valor);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.prev = this.cola;
            if (this.cola) this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.longitud++;
    }

    prepend(valor: T): void {
        const nuevoNodo = new Nodo(valor);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.prev = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        this.longitud++;
    }

    traverseToIndex(indice: number): Nodo<T> | null {
        if (indice < 0 || indice >= this.longitud) return null;
        let nodoActual = this.cabeza;
        let i = 0;
        while (nodoActual && i !== indice) {
            nodoActual = nodoActual.siguiente;
            i++;
        }
        return nodoActual;
    }

    insert(indice: number, valor: T): void {
        if (indice === 0) {
            this.prepend(valor);
        } else if (indice >= this.longitud) {
            this.append(valor);
        } else {
            const nuevoNodo = new Nodo(valor);
            const lider = this.traverseToIndex(indice - 1);
            if (!lider || !lider.siguiente) return;
            
            const seguidor = lider.siguiente;
            lider.siguiente = nuevoNodo;
            nuevoNodo.prev = lider;
            nuevoNodo.siguiente = seguidor;
            seguidor.prev = nuevoNodo;
            this.longitud++;
        }
    }

    remove(indice: number): void {
        if (indice < 0 || indice >= this.longitud) return;
        if (indice === 0 && this.cabeza) {
            this.cabeza = this.cabeza.siguiente;
            if (this.cabeza) this.cabeza.prev = null;
        } else if (indice === this.longitud - 1 && this.cola) {
            this.cola = this.cola.prev;
            if (this.cola) this.cola.siguiente = null;
        } else {
            const lider = this.traverseToIndex(indice - 1);
            if (!lider || !lider.siguiente) return;
            
            const nodoAEliminar = lider.siguiente;
            const seguidor = nodoAEliminar.siguiente;
            if (seguidor) seguidor.prev = lider;
            lider.siguiente = seguidor;
        }
        this.longitud--;
    }

    imprimirLista(): void {
        let nodoActual = this.cabeza;
        const resultado: string[] = [];
        while (nodoActual) {
            resultado.push(String(nodoActual.valor));
            nodoActual = nodoActual.siguiente;
        }
        console.log(resultado.join("-"));
    }
}

const miLista = new ListaDoblementeEnlazada<number>();
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
