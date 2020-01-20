class ResizeElement {


    resizing = false
    currentElement = null
    handler = null

    constructor(elem) {
        this.currentElement=elem
        this.addHandles(elem);


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
            top: coords.top,
            left: coords.left,
            height: coords.height,
            width: coords.width

        };
    }


    getAsPx(pixels) {
        return pixels + "px";
    }

    modifyContainerPosition(evt){


        let coords  = this.getCoordinates(this.handler)

        const addedHeight = evt.pageY - coords.top
        console.log(evt.pageY,addedHeight)
        coords.top=evt.pageY
        coords.height=coords.height + addedHeight;
        this.setPositionBasedOnCoordinates(this.handler,coords)


    }

    createDragEvents(){

        const cur =this
        function mouseMove(evt){


            cur.modifyContainerPosition(evt)
        }
        document.body.addEventListener("mousemove", mouseMove)
        document.body.addEventListener("mouseup", (evt) => {
            document.body.removeEventListener("mousemove",mouseMove);
        })

    }

    addDotsToHandler(handler) {

        let handlerCoords = this.getCoordinates(handler)
        const edgeSize = 12


        const topLeftEdge = this.getTopLeft(handlerCoords, edgeSize);
        handler.appendChild(topLeftEdge)
        const topMiddleEdge = this.getTopMiddle(handlerCoords, edgeSize);
        handler.appendChild(topMiddleEdge)
        topMiddleEdge.addEventListener("mousedown", (evt) => {
            console.log("resize start")

          this.createDragEvents()
        });

    }

    UpdateTopOfHandlerContainer(evt){
        //Update container
        //Update element


    }
    getTopLeft(handlerCoords, edgeSize) {

        const pos= {
            top: 0 - (edgeSize / 2),
            left: 0 - (edgeSize / 2)
        };

        return this.createEdge(pos,"nw-resize",edgeSize);

    }



    getTopMiddle(handlerCoords, edgeSize) {
        const pos= {
            top: 0 - (edgeSize / 2),
            left:(handlerCoords.width / 2) - (edgeSize / 2)
        };


      return this.createEdge(pos,"ns-resize",edgeSize);
    }

    createEdge(pos, cursor, edgeSize) {


        const edge = document.createElement("div");
        edge.style.cursor = cursor;
        this.styleEdge(edge, edgeSize);

        this.setPositionBasedOnXy(edge,pos);
        return edge;
    }

    addDot() {

    }

    addHandles(elem) {
        console.log("Adding Handles", elem);


        const handler = this.getHandler(elem);
        document.body.appendChild(handler);
        this.handler=handler
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
    styleEdge(edge, edgeSize) {
        edge.style.backgroundColor = "White";
        edge.style.height = this.getAsPx(edgeSize)
        edge.style.width = this.getAsPx(edgeSize)
        edge.style.border = "0.5px solid blue"
        edge.style.display = "inline-block"
        edge.style.position = "absolute"
    }
    setPositionBasedOnCoordinates(container, formattedCoordinates) {
        container.style.left = this.getAsPx(formattedCoordinates.left);
        container.style.top = this.getAsPx(formattedCoordinates.top);
        container.style.width = this.getAsPx(formattedCoordinates.width);
        container.style.minWidth = this.getAsPx(formattedCoordinates.width);
        container.style.minHeight =this.getAsPx( formattedCoordinates.height);
        container.style.height = this.getAsPx(formattedCoordinates.height);
    }
    setPositionBasedOnXy(container, formattedCoordinates) {
        container.style.left = this.getAsPx(formattedCoordinates.left);
        container.style.top = this.getAsPx(formattedCoordinates.top);

    }
}

