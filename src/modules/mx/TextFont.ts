
type FontCellCoords = {
    x: number;
    y: number;
    width: number;
}

export class TextFont {
    textureId: number;
    frame: number;
    coords: Vec3[];

    xOffset: number;
    yOffset: number;
    xScale: number;
    yScale: number;

    width: number;
    height: number;
    lineHeight: number;
    overlap: number;

    supportedCharacters: string;
    characterFallback: string;
    map: Record<string, number>;
    
    constructor(
        textureId: number,
        frame: number,
        xOffset: number,
        yOffset: number,
        xScale: number,
        yScale: number,
        width: number,
        height: number,
        lineHeight: number,
        overlap: number,
        coords: Vec3[],
        characters: string,
        key: string
    ) {
        this.textureId = textureId;
        this.frame = frame;
        this.coords = coords;

        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.xScale = xScale;
        this.yScale = yScale;
        
        this.width = width;
        this.height = height;
        this.lineHeight = lineHeight;
        this.overlap = overlap;

        this.supportedCharacters = characters;
        this.characterFallback = key;
        this.map = this.makeFontCellMap(characters, key);
    }

    /**
    * Creates a font cell map that maps a character to its cell coordinate position in the font object
    * 
    * Example used in comments:
    *   characters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-=+_[]\\|:;\"'<>/?,.~`0123456789"
    *   key = *
    * 
    * @param characters The characters we want to allow for drawing
    * @param key The fallback character if an ascii character is not present (must be included in characters array)
    */
    private makeFontCellMap(characters: string, key: string): Record<string, number> {
        if (!characters.includes(key)) {
            throw new Error("Could not find key in characters...failed to set up font cell map.");
        }

        /** fallbackCharacterIndex = characters.indexOf('*') = 33 */
        const fallbackCharacterIndex = characters.indexOf(key);
        let map: Record<string, number> = {};
        
        // for the 128 ascii characters set up map for all indexes needed equal to the fallback
        // (the fallback is drawn when we get an unexpected character)
        // map["a"] = 33
        for (let i = 0; i < 128; i++) {
            map[String.fromCharCode(i)] = fallbackCharacterIndex;
        }
    
        // map[characters[i]] = i
        // i = 0
        // map["a"] = 0;
        // i = 1
        // map["b"] = 1;
        for (let i = 0; i < characters.length; i++) {
          map[characters[i]] = i;
        }
    
        return map;
    }

    private getFontCellCoords(character: string): FontCellCoords {
        // if character is not in the font map we created, notify
        if (!(character in this.map)) {
          mx.message("Not in map " + character);
          return { x: 0, y: 0, width: 0 };
        }
        /* return the coords in our font variable
            character = ','
            font.coords[font.map[,]];
            font.map[,] = 11;
            font.coords[11] = [360, 0, 40]
        */
        const coords = this.coords[this.map[character]];
        return { x: coords[0], y: coords[1], width: coords[2] };
    }

    /**
     * Calculates the length of the text to draw and (optionally) draws the text
     * @param startX 
     * @param startY 
     * @param textToDraw 
     * @param draw 
     * @returns 
     */
    public measureAndDrawText (
        startX: number,
        startY: number,
        textToDraw: string,
        draw: boolean = false
    ): number {
        // Starting x and y values set to dx and dy
        let destinationX = startX;
        let destinationY = startY;

        // Go through the whole string to draw
        for (let i = 0; i < textToDraw.length; i++) {
            if (textToDraw[i] == "\n") {
                // Reset the destination x to the beginning
                destinationX = startX;
                destinationY += this.lineHeight / this.height * this.yScale;
                continue;
            }

            if (textToDraw[i] == " ") {
                const cellCoords = this.getFontCellCoords(","); /* comma about as wide as space */
                destinationX += cellCoords.width / this.width * this.xScale;
                continue;
            }

            // get cell coordinates of current character from font
            const cellCoords = this.getFontCellCoords(textToDraw[i]);

            //mx.message("character: " + textToDraw[i] + " | coords: [" + cellCoords[0].toString() + ", " + cellCoords[1].toString() + ", " + cellCoords[2].toString() + "]");
            const sourceX = cellCoords.x / this.width * this.xScale + this.xOffset;
            const sourceY = cellCoords.y / this.height * this.yScale + this.yOffset;
            const width = cellCoords.width / this.width * this.xScale;
            const height = this.lineHeight / this.height * this.yScale;

            if (draw) {
                mx.paste_custom_frame(
                    this.textureId, this.frame,
                    sourceX, sourceY,
                    destinationX, destinationY,
                    width, height
                );
            }
        
            // new X destination
            destinationX += width - this.overlap / this.width * this.xScale;
        }

        return destinationX - startX;
    }

    /**
     * Draws the text "text" for font "font" at starting at position ("x", "y") with optional parameter for centering
     * @param x Starting position x
     * @param y Staring position y
     * @param text The text to draw
     * @param centered Should the text be centered
     * @returns 
     */
    public drawText(
        x: number, y: number,
        text: string,
        centered: boolean = false
    ): void {
        if (!centered) {
            this.measureAndDrawText(x, y, text, true);
            return;
        }

        const textWidth = this.measureAndDrawText(x, y, text, false);
        const centerX = x - textWidth * 0.5;

        this.measureAndDrawText(centerX, y, text, true);
    }
}