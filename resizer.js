class Resizer {

    targetElements = []
    resizing =false
    init(elems) {

        if(elems instanceof NodeList){
            this.targetElements=Array.from(elems)
        }else{
            this.targetElements.push(elems)
        }

       // this.targetElements = elems

        for (const elem of this.targetElements) {

            new ResizeElement(elem)
        }


    }

    getCoordinates(elem) {
        let box = elem.getBoundingClientRect();

        console.log(box)
        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset,
            height: box.height,
            width: box.width

        };
    }
    getCoordinatesToDrawHandle(elem) {
        let coords = this.getCoordinates(elem)

        coords.top = coords.top - 24
        coords.left = coords.left - 5
        coords.height = coords.height + 5
        coords.width = coords.width + 5
        return {
            top: this.getAsPx(coords.top),
            left: this.getAsPx(coords.left),
            height: this.getAsPx(coords.height),
            width: this.getAsPx(coords.width)

        };
    }


    getAsPx(pixels) {
        return pixels+ "px";
    }

    addDotsToHandler(handler){

        let handlerCoords = this.getCoordinates(handler)
        const edgeSize = 12


        const topLeftEdge = this.getTopLeft(handlerCoords,edgeSize);
        handler.appendChild(topLeftEdge)
        const topMiddleEdge = this.getTopMiddle(handlerCoords,edgeSize);
        handler.appendChild(topMiddleEdge)
        topMiddleEdge.addEventListener("mousedown", (evt)=>{
            this.resizing = true
        });
        topMiddleEdge.addEventListener("mouseup", (evt)=>{
            this.resizing = false
        });

    }

    getTopLeft(handlerCoords,edgeSize) {

        const edge = document.createElement("div");
        this.styleEdge(edge, edgeSize);


        edge.style.cursor = "nw-resize"
        edge.style.top = this.getAsPx(0 - (edgeSize / 2))
        edge.style.left = this.getAsPx(0 - (edgeSize / 2))
        edge.style.position = "absolute"

        return edge;
    }

    styleEdge(edge, edgeSize) {
        edge.style.backgroundColor = "White";
        edge.style.height = this.getAsPx(edgeSize)
        edge.style.width = this.getAsPx(edgeSize)
        edge.style.border = "0.5px solid blue"
        edge.style.display = "inline-block"
    }

    getTopMiddle(handlerCoords,edgeSize) {

        const edge = document.createElement("div");
        this.styleEdge(edge, edgeSize);


        edge.style.cursor = "ns-resize"
        edge.style.top = this.getAsPx(0 - (edgeSize / 2))
        edge.style.left = this.getAsPx((handlerCoords.width/2) - (edgeSize / 2))
        edge.style.position = "absolute"
        return edge;
    }

    addDot(){

    }
    addHandles(elem) {
        console.log("Adding Handles", elem);


        const handler= this.getHandler(elem );
        document.body.appendChild(handler);
        this.addDotsToHandler(handler)
    }

    getHandler(elem) {
        const container = document.createElement("div");
        let handlerPosition = this.getCoordinatesToDrawHandle(elem)
        this.setPositionBasedOnCoordinates(container, handlerPosition);
        container.style.color = "White";
        container.style.position = "absolute";
        container.style.border = "5px dotted black "
        return container;
    }

    setPositionBasedOnCoordinates(container, handlerPosition) {
        container.style.left = handlerPosition.left;
        container.style.top = handlerPosition.top;
        container.style.width = handlerPosition.width;
        container.style.minWidth = handlerPosition.width;
        container.style.minHeight = handlerPosition.height;
        container.style.height = handlerPosition.height;
    }
}

