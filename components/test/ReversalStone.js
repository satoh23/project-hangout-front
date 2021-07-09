const reversalTop = (othelloState, rowNum, colNum, myState) => {
    for (let row = rowNum-1; 0 < row; row--) {
        const square = othelloState[row][colNum]
        if (square!==myState) {
            othelloState[row][colNum] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalTopRight = (othelloState, rowNum, colNum, myState) => {
    for (let row=rowNum-1, col=colNum+1; 0<row&&col<8; row--,col++) {
        const square = othelloState[row][col]
        if (square!==myState) {
            othelloState[row][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalRight = (othelloState, rowNum, colNum, myState) => {
    for (let col = colNum+1; col < 8; col++) {
        const square = othelloState[rowNum][col]
        if (square!==myState) {
            othelloState[rowNum][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalBottomRight = (othelloState, rowNum, colNum, myState) => {
    for (let row=rowNum+1, col=colNum+1; row<8&&col<8; row++,col++) {
        const square = othelloState[row][col]
        if (square!==myState) {
            othelloState[row][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalBottom = (othelloState, rowNum, colNum, myState) => {
    for (let row = rowNum+1; row < 8; row++) {
        const square = othelloState[row][colNum]
        if (square!==myState) {
            othelloState[row][colNum] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalBottomLeft = (othelloState, rowNum, colNum, myState) => {
    for (let row=rowNum+1, col=colNum-1; row<8&&0<col; row++,col--) {
        const square = othelloState[row][col]
        if (square!==myState) {
            othelloState[row][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalLeft = (othelloState, rowNum, colNum, myState) => {
    for (let col = colNum-1; 0 < col; col--) {
        const square = othelloState[rowNum][col]
        if (square!==myState) {
            othelloState[rowNum][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

const reversalTopLeft = (othelloState, rowNum, colNum, myState) => {
    for (let row=rowNum-1, col=colNum-1; 0<row&&0<col; row--,col--) {
        const square = othelloState[row][col]
        if (square!==myState) {
            othelloState[row][col] = myState
        } else if (square===myState) {
            return othelloState
        }
    }
}

export function reversalStone(othelloState, rowNum, colNum, myState, canReversalDirection) {
    let newOthelloState = othelloState
    if (canReversalDirection.includes(0)) {
        reversalTop(newOthelloState, rowNum, colNum, myState);
    }
    if (canReversalDirection.includes(1)) {
        reversalTopRight(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(2)) {
        reversalRight(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(3)) {
        reversalBottomRight(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(4)) {
        reversalBottom(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(5)) {
        reversalBottomLeft(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(6)) {
        reversalLeft(newOthelloState, rowNum, colNum, myState)
    }
    if (canReversalDirection.includes(7)) {
        reversalTopLeft(newOthelloState, rowNum, colNum, myState)
    }
    return newOthelloState
}
