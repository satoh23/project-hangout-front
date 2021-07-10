export async function checkTop(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===0) {
        return false
    }
    for (let row = rowNum-1; 0 <= row; row--) {
        const square = othelloState[row][colNum]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        } else if (square===myState) {
            return false
        }
    }
}

export async function checkBottom(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===7) {
        return false
    }
    for (let row = rowNum+1; row < 9; row++) {
        const square = othelloState[row][colNum]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        } else if (square===myState) {
            return false
        }
    }
}

export async function checkRight(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (colNum===7) {
        return false
    }
    for (let col = colNum+1; col < 9; col++) {
        const square = othelloState[rowNum][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        } else if (square===myState) {
            return false
        }
    }
}

export async function checkLeft(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (colNum===0) {
        return false
    }
    for (let col = colNum-1; 0 <= col; col--) {
        const square = othelloState[rowNum][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        } else if (square===myState) {
            return false
        }
    }
}

export async function checkTopRight(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===0 || colNum===7) {
        return false
    }
    for (let row=rowNum-1, col=colNum+1; 0<=row&&col<9; row--,col++) {
        const square = othelloState[row][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        }
    }
}

export async function checkBottomRight(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===7 || colNum===7) {
        return false
    }
    for (let row=rowNum+1, col=colNum+1; row<9&&col<9; row++,col++) {
        const square = othelloState[row][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        }
    }
}

export async function checkTopLeft(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===0 || colNum===0) {
        return false
    }
    for (let row=rowNum-1, col=colNum-1; 0<=row&&0<=col; row--,col--) {
        const square = othelloState[row][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        }
    }
}

export async function checkBottomLeft(othelloState, rowNum, colNum, myState) {
    let canSandwichStone = false
    if (rowNum===7 || colNum===0) {
        return false
    }
    for (let row=rowNum+1, col=colNum-1; row<9&&0<=col; row++,col--) {
        const square = othelloState[row][col]
        if (square===null) {
            return false
        } else if (square!==myState) {
            canSandwichStone = true
            continue;
        } else if (square===myState && canSandwichStone) {
            return true
        }
    }
}

export function returnCanReversalDirection(directionList) {
    let canReversalDirectionList = []
    directionList.map(function(direction, index) {
        if (direction===true) {
            canReversalDirectionList.push(index)
        }
    })
    return canReversalDirectionList
}
