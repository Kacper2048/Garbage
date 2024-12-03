
import BoardGenerator from './BoardComponent/BoardGenerator.jsx';
import { useState, useRef, useEffect } from 'react';
import './BoardComponent/boardStyle.css';

let size_x = 20;
let size_y = 20;

function BTSComponent({ children }) {

    let [drawing, updateDrawing] = useState(0);
    let ifMade = useRef(false);
    let path = useRef([]);

    let visited = useRef(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0],
            [0, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, -1, -1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0],
            [0, 0, 0, 0, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1, -1, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, -1, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
            [0, 0, -1, -1, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, 0],
            [0, 0, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0],
            [0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0]
        ]
    );

    let prev = useRef( new Array(size_y).fill(null).map( () => new Array(size_x).fill(null)));

    let queue = useRef([]);
    let size = useRef(size_x * size_y);

    function findNeighbours(nodePos) {
        let array = [];
        //return up
        if (nodePos.row > 0) {
            array.push({ row: nodePos.row - 1, col: nodePos.col })
        }

        //add right
        if (nodePos.col < (size_x - 1)) {
            array.push({ row: nodePos.row, col: nodePos.col + 1 })
        }

        //add down
        if (nodePos.row < (size_y - 1)) {
            array.push({ row: nodePos.row + 1, col: nodePos.col })
        }

        //add left
        if (nodePos.col > 0) {
            array.push({ row: nodePos.row, col: nodePos.col - 1 })
        }
        return array;
    }
    
    function bts(startPos, endPos) {
            console.log("startPos: " + startPos.row + "  startPos: " + startPos.col)
            queue.current.push(startPos); //send as first our start position (row,col)
            console.log("queue: " + queue.current)
            let start_row = startPos.row;
            let start_col = startPos.col;
            let end_row, end_col = endPos;

            visited.current[start_row][start_col] = -2; //marked position (row,col) as visited

            while (queue.current.length > 0) {
                //set "node" represent (row,col) pos
                let node = queue.current.shift();
                //console.log("node:" + node.row + "  " + node.col);

                // If we have reached the end position, stop
                if (node.row === endPos.row && node.col === endPos.col) {
                    console.log("Reached the end position!");
                    ifMade.current = true;
                    return;  // Exit the function
                }

                let neighbours = findNeighbours(node); //return array with objects represent (row,col) pos of node's neighbours
                //console.log(visited.current);
                //add to queue all non-visited neighbours
                neighbours.forEach((next) => {
                    if (visited.current[next.row][next.col] == 0) //0 mean is not visited
                    {
                        console.log("visited node row: " + next.row + " col: " + next.col + "  for node: " + (node.row * size_x + node.col + 1))
                        queue.current.push(next);
                        visited.current[next.row][next.col] = -2;
                        prev.current[next.row][next.col] = node; //save as obj with pos
                    }
                }
                )
                console.log("\n");
            }
    }

    function findPath(startPos, endPos) {
    
        // Trace back from the end position to the start
        for (let at = endPos; at != null; at = prev.current[at.row][at.col]) {
            path.current.push(at);
        }
    
        // The path is now in reverse order, so reverse it
        path.current.reverse();
        console.log(path.current);
    }

    useEffect(() => {
        if (ifMade.current == false) {

        if (drawing === 0) {
            bts({ row: 16, col: 0 }, { row: 12, col: 17 });
            findPath({ row: 16, col: 0 }, { row: 12, col: 17 })
            updateDrawing((prev) => prev + 1);
        }
    }
    }, [drawing]);

    return (

        <div className='board'>
            {visited.current.map((element, row) => (
                <div key={row} className='row'>
                    {
                        element.map((x, col) => {
                            return (
                                <div className={'tile ' + (x === 0 ? "emptySpace" : (x === -1 ? 'wall' : ( path.current.some(p => p.row === row && p.col === col ) ? "pathPellet": "checkPellet" )))} tabIndex={0} key={row * size_x + col}>

                                </div>
                            );
                        }
                        )
                    }
                </div>
            )
            )
            }
        </div>
    );
}

export default BTSComponent;