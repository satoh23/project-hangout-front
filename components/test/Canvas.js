import React from 'react';
import { Circle, Layer, Rect, Stage } from "react-konva";
import { useState } from "react";
import Cookie from "universal-cookie";
import { checkBottom, checkTop, checkRight, checkLeft,
         checkTopRight, checkBottomRight, checkTopLeft, checkBottomLeft,
         returnCanReversalDirection } from "./Check";
import { reversalStone } from "./ReversalStone";

const cookie = new Cookie();

// (int, int) => int
const calcStageOneSide = (windowWidth, windowHeight) => {
    let stageOneSide = windowWidth
    if (windowWidth > 1024) {
        stageOneSide = Math.floor((windowHeight/3*2)/10)*8
    } else if (windowWidth > 768) {
        stageOneSide = Math.floor((windowWidth/5*4)/10)*8
    }
    return stageOneSide
}

// (int, int, int) => dict
const calcMargin = (rowNum, colNum, margin) => {
    const marginH = rowNum * margin + margin
    const marginW = colNum * margin + margin
    if (isNaN(marginH)) {
        return {"height": 0, "width": 0}
    }
    return {"height": marginH, "width": marginW}
}

// () => list
const initOthelloState = () => {
    let othelloState = []
    while (othelloState.length<8) {
        othelloState.push(Array(8).fill(null))
    }
    // 石の初期配置
    othelloState[3][3] = 0
    othelloState[4][4] = 0
    othelloState[3][4] = 1
    othelloState[4][3] = 1

    othelloState[5][4] = 0
    othelloState[5][5] = 0
    othelloState[5][6] = 0
    othelloState[5][7] = 0
    othelloState[6][7] = 0
    othelloState[4][7] = 1
    othelloState[3][5] = 1
    othelloState[4][6] = 1
    return othelloState
}

// (list, int, int, int) => list
const updateOthelloState = (othelloState, rowNum, colNum, state, canReversalDirection) => {
    let newOthelloState = [].concat(othelloState)
    newOthelloState[rowNum][colNum] = state
    newOthelloState = reversalStone(newOthelloState, rowNum, colNum, state, canReversalDirection)
    return newOthelloState
}

// (list, int, int, int) => promise(boolen)
const canPutValidation = async(othelloState, rowNum, colNum, myState) => {
    const top = checkTop(othelloState, rowNum, colNum, myState)
    const topRight = checkTopRight(othelloState, rowNum, colNum, myState)
    const right = checkRight(othelloState, rowNum, colNum, myState)
    const bottomRight = checkBottomRight(othelloState, rowNum, colNum, myState)
    const bottom = checkBottom(othelloState, rowNum, colNum, myState)
    const bottomLeft = checkBottomLeft(othelloState, rowNum, colNum, myState)
    const left = checkLeft(othelloState, rowNum, colNum, myState)
    const topLeft = checkTopLeft(othelloState, rowNum, colNum, myState)

    const canPut = Promise.all([top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft]).then((res) => {
        if (res.includes(true)) {
            const canReversalDirection = returnCanReversalDirection(res)
            return {"canPut": true, "canReversalDirection": canReversalDirection}
        } else {
            return false
        }
    })
    return canPut
}

// (int) => str
const returnStoneColor = (stoneState) => {
    if (stoneState===0) {
        return "white"
    } else if (stoneState===1) {
        return "black"
    }
}

// (str) => int
const returnMyState = (genderId) => {
    if (genderId===process.env.NEXT_PUBLIC_FEMALE_ID) {
        return 0
    } else if (genderId===process.env.NEXT_PUBLIC_MALE_ID) {
        return 1
    }
}

export default function Test() {
    const { innerWidth: width, innerHeight: height } = window;
    const genderId = cookie.get("GID")
    const margin = 3
    const stageOneSide = calcStageOneSide(innerWidth, innerHeight)
    const squareOneSide = (stageOneSide - 9*margin) / 8
    const [othelloState, setOthelloState] = useState(initOthelloState())

    // (int, int, int) => dict
    const calcCoordinate = (rowNum, colNum, margin) => {
        const squareMargin = calcMargin(rowNum, colNum, margin)
        const x = squareOneSide * colNum + squareMargin.width
        const y = squareOneSide * rowNum + squareMargin.height
        return {"x": x, "y": y}
    }

    // (int, int, int) => canvas
    const squareCnvs = (squareState, rowNum, colNum) => {
        const coordinate = calcCoordinate(rowNum, colNum, margin)
        return(
            <Rect
             key={colNum}
             fill="green" 
             stroke="yellow" 
             strokeWidth={1} 
             x={coordinate.x} 
             y={coordinate.y} 
             width={squareOneSide} 
             height={squareOneSide} 
             onClick={() => handleClick(rowNum, colNum)} 
             onTouchStart={() => handleClick(rowNum, colNum)}/>
        )
    }

    // (int, int, int) => canvas
    const stoneCnvs = (stoneState, rowNum, colNum) => {
        const coordinate = calcCoordinate(rowNum, colNum, margin)
        if (stoneState===null) {
            return
        } else {
            return (
                <Circle
                key={colNum} 
                fill={returnStoneColor(stoneState)}
                x={coordinate.x + squareOneSide/2} 
                y={coordinate.y + squareOneSide/2} 
                width={squareOneSide/5*3} 
                height={squareOneSide/5*3}/>
            )
        }
    }

    // (int, int) => 無し
    // 引数: (親配列のindex, 子配列のindex)
    // 選択されたマスに何も置かれていなければ石を置く。置かれていたら何も処理しない
    const handleClick = (rowNum, colNum) => {
        if (othelloState[rowNum][colNum]!==null) {
            return
        } else {
            const myState = returnMyState(genderId)
            canPutValidation(othelloState, rowNum, colNum, myState).then((res) => {
                if (res.canPut) {
                    setOthelloState(updateOthelloState(othelloState, rowNum, colNum, myState, res.canReversalDirection))
                }
            })
        }
    }

    return (
        <div>
            <div className="text-3xl text-center font-bold m-5">
                オセロです
            </div>
            <div className="flex justify-center item-center">
                <Stage width={stageOneSide} height={stageOneSide}>
                    <Layer>
                        <Rect fill="black" x={0} y={0} width={stageOneSide} height={stageOneSide} />
                        {othelloState && othelloState.map((array, rowIndex) => array.map((state, colIndex) => squareCnvs(state, rowIndex, colIndex)))}
                        {othelloState && othelloState.map((array, rowIndex) => array.map((state, colIndex) => stoneCnvs(state, rowIndex, colIndex)))}
                    </Layer>
                </Stage>
            </div>
        </div>
    )
}
