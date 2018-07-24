
  export class Dispatcher {

    static say (name: string) {
        return "ClassA say: " + name;
    }
  }

  export class Metro {

    constructor(private host: Element) {
      host.appendChild(document.createElement("canvas"));
    }

  }
