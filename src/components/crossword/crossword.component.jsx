import "./crossword.styles.css"
import {useEffect, useState} from 'react'
import CrossWordCell from '../crossword-cell/crossword-cell.component'


const CrossWord = ({currentWordList}) => {

// start with the word with the least common occurrences (assume it is placed vertially)  Record the squares as "vertical targets"

// Find a word that can intersect with it and run vertically.  record the squares.  the squares with abs value > 1 away from the
// place of intersection are "vertical targets"  the others, including -12 and +12 (rowLength) for the length of the word, are
// blocked horizontally.

//Find a word that can cross either a horizontal or vertical target.  Perform the operations as outlined.
let wordList = ["cheese", "baloney", "bacon", "triangle", "pepppers"]

const [currentTempWordList, setCurrentTempWordlist] = useState(["baloney", "bacon", "triangle", "pepppers"])

let firstWord = wordList[0] //vertical


const [setValues, setSetValues] = useState([])
const [verticalTargets, setVerticalTargets] = useState([])
const [direction, setDirection] = useState({})
const [minMatchFind, setMinMatchFind] = useState([])
const [potentialMatches, setPotentialMatches] = useState([])
const [horizontalTargets, setHorizontalTargets] = useState([])
let blockedVertical = []
let blockedHorizontal = []

useEffect(() => {
    setSetValues(prev => {
        const alreadyExists = prev.some(entry => entry.word === firstWord);
        if (alreadyExists) return prev;

  const newValues = [];
  setDirection(prev => ({ ...prev, [firstWord]: "vert" }));
  for (let i = 0; i < firstWord.length; i++) {
    newValues.push({
      cellValue: i+ i*(gridRows-1),
      letter: firstWord[i]
    });
  }
  const newEntry = {
    word: firstWord, 
    direction: "vert",
    values: newValues
  }
    return [...prev, newEntry];
    })
}, []);
        
  
                                                    // this should probably store letter information too
                                              // horizontalTargets[{c:0}, {h:12}, {e:24}, {e:36}, {s:48}, {e:60} ]

let secondWord = wordList[1]

// for (let letter in secondWord) {
//     for (let i = 0; i < horizontalTargets.length; i++) {
//         if letter === Object.values(horizontalTarget)
//         testPossibleHorizontalWord(secondWord, letter)           // think I'll need some index value coz there might be
//     }                                                            // two letters in secondWord that meet the condition
// }                                                                // this should make sure the index where the secondWord
                                                                 // meets a horizontal Target to the front of the word (so 
                                                                 // if the index is 3 then three squares to the left, and 
                                                                 // secondWord.length - 3 squares to the right) are not 
                                                                 // occupied by a square included in "blockedHorizontal"
                                                                 //  . . . now . . . how to run
for (let i = 0; i < secondWord.length; i++) {
     
}


    const [grid, setGrid] = useState([])
    const [data, setData] = useState([
        {result: "hello",
        direction: "horizontal",
        occupied: [33, 34, 35, 36, 37]},
        {result: "goodbye",
        direction: "vertical",
        occupied: [13, 37, 61, 85, 109, 133, 157]},
    ])

    const [occupiedAll, setOccupiedAll] = useState([])
    const [lettersAll, setLettersAll] = useState([])
    const [letterObject, setLetterObject] = useState({})
    const [placeIndex, setPlaceIndex] = useState(1)
    const [missedWords, setMissedWords] = useState([])
    const [missedCounter, setMissedCounter] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [firstCoordsArry, setFirstCoordsArry] = useState({})

         
        let SWR = 23  // Start Wall Right
        let GL = 12   //Grid Length
        let rowAmt = 12
        const gridCols = 12
        const gridRows = 12
  
    // useEffect(() => {
    //     let newArry = []
    //     newArry = currentWordList                             looking for starting list
    //     setCurrentTempWordlist(newArry)
    // }, [])

    // useEffect(() => {
    //     const objectR = {};
    //     for (let i = 0; i < occupiedAll.length; i++) {
    //         objectR[occupiedAll[i]] = lettersAll[i];
    //     }
    //     setLetterObject(objectR);                             commented out due to error "cannot convert undefined or null to object"
    //     }, [occupiedAll, lettersAll]);


    useEffect (()=> {
        var objectR = {}
        let newArry = []
        let newArry2 = []
        data.map(values => newArry.push(values.direction))
        data.map(values => newArry2.push(values.occupied[0]))
        for (let i = 0; i < newArry.length; i++) {
        objectR[newArry2[i]] = newArry[i];
        setFirstCoordsArry(objectR)
        }
    }, [data])

    useEffect (() => {
        let newOccupiedArray = []
        let newLetterArray = []
        for (let i=0; i<dataLength; i++)
        {
        newOccupiedArray.push(...(data.map((values) => values.occupied))[i])
        newLetterArray.push(...((data.map((values) => values.result)[i]).split('')))
        }
        setOccupiedAll(newOccupiedArray)
        setLettersAll(newLetterArray)
    }, [data])

    useEffect(()=> {
        let gridArray = []
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
          gridArray.push(
          <CrossWordCell
          key={`${r}-${c}`}
          data={data}
          occupiedAll={occupiedAll}
          firstCoordsArry={firstCoordsArry}
            >
            {r*12+c}
            </CrossWordCell>
          )
        setGrid(gridArray)
            }}
    }, [letterObject, gridRows, gridCols, data, occupiedAll, firstCoordsArry])
 
//     const renderGrid = () => {
//   return Array.from({ length: CellAmt }).map((_, i) => (
//     <CrossWordCell
//       data={data}                             CGPT recommends rendering it like THIS
//       occupiedAll={occupiedAll}               No need for useEffect just to create JSX
//       firstCoordsArry={firstCoordsArry}       Says I need to include occupiedAll, data, and firstCoordsArry in dependencies
//       index={i}
//       key={i}
//     >
//       {occupiedAll.includes(i) ? letterObject[i] : " "}
//     </CrossWordCell>
//   ))
// }

// <div id="cw-container">{renderGrid()}</div>

   

    // let sampleLetterObject = ['11', '35', '59', '106', '107', '127']
    // let sampleIntersectCoords = 107
    function addSurroundingCoords(arr, coords, direction){
    let newCoords = arr.filter(item => (direction == "vertical") ?
    (item !== coords.toString()) && (item !== (coords+1).toString()) && (item !== ((coords-1).toString())) :
    (item !== (coords.toString()) && (item !== (coords+GL).toString()) && (item !== ((coords-GL).toString()))))
        return newCoords
    } 

    const enhancer = (arr) => {
        let newMap = arr.map((x) => (parseInt(x) + 1)) 
        let newMap2 = arr.map((x) => (parseInt(x) - 1))
        let newMap3 = arr.map((x) => (parseInt(x) - (GL)))
        let newMap4 = arr.map((x) => (parseInt(x) + (GL)))
        return ((arr.concat(newMap, newMap2, newMap3, newMap4))).toString().split(",")
        }

    function sortTempWordList(){
        let newArry = []
        currentTempWordList.forEach((word) => {
            newArry.push(...(word.split('')))
        })
    }


    function consoleLogFunction() {
        console.log(verticalTargets)
        console.log("setValues = ", setValues)
        // console.log(direction)
        console.log("minMatchFind = ", minMatchFind)
        console.log("potentialMatches = ", potentialMatches)
    }

    function findMinMatchAndPlace() {
        const leastMatches = minMatchFind.reduce((min, current) =>
        current.matches < min.matches ? current : min
            );
        const wordToPlace = leastMatches.word2
        let tempCurrWord = {
                word: "cheese",
                direction: "vert",
                startSquare: 0,
                values: [
                    {
                        cellValue: 0,
                        letter: "c"
                    },
                    {
                        cellValue: 12,
                        letter: "h"
                    },
                    {
                        cellValue: 24,
                        letter: "e"
                    },
                    {
                        cellValue: 36,
                        letter: "e"
                    },
                    {
                        cellValue: 48,
                        letter: "s"
                    },
                    {
                        cellValue: 60,
                        letter: "e"
                    }
                ]
}
      const result = potentialMatches.filter(item => item.word === wordToPlace);

      let newDirection

    if (tempCurrWord.direction === "vert") {
        newDirection = "horiz"
        startingSquare = (tempCurrWord.startSquare + (gridRows-1)*result.index1) - wordToPlace.length()-result.index2
        for (let i = 0; i < wordToPlace.length(); i++) {
                newValues.push({
                cellValue: i + startingSquare,
                letter: wordToPlace[i]
                });
            }
            const newEntry = {
                word: firstWord, 
                direction: newDirection,
                values: newValues
            }
    return [...prev, newEntry];
    }}

    function findIndexesAndMinMatch() {
        let tempDir = "vert"
        let letters = Object.values(setValues).map(item => item.letter);
        let remainingWordList = currentTempWordList

        const word1 = "elephant";

                        const allMatches = [];

                        remainingWordList.forEach(word2 => {
                        let count = 0;

                        for (let i = 0; i < word1.length; i++) {
                            for (let j = 0; j < word2.length; j++) {
                            if (word1[i] === word2[j]) {
                                allMatches.push({
                                word2,
                                letter: word1[i],
                                index1: i,
                                index2: j
                                });
                                count++;
                            }
                            }
                        }
                        if (count === 0) {
                              setMinMatchFind(prev => [...prev, 
                            {
                            word2,
                            matches: 0
                        }]);
                        } else {
                           setMinMatchFind(prev => [...prev, 
                            {
                            word2,
                            matches: count
                        }]);
                        }
                        });
                            const reshapedMatches = allMatches.reduce((acc, { word2, letter, index1, index2 }) => {
                            let entry = acc.find(item => item.word === word2);
                            if (!entry) {
                                entry = { word: word2, otherInfo: [] };
                                acc.push(entry);
                            }
                            entry.otherInfo.push({ letter, index1, index2 });
                            return acc;
                            }, [])
                        setPotentialMatches(reshapedMatches)
                    }

   
    function findLastCoords(a) {
        let intMap = a.map(item => parseInt(item))
        return intMap.pop()
    }
      
        function invertDirection(direction) {
            return direction == "horizontal" ? "vertical" : "horizontal"
        }
    
        function placeFirstResult() {
            let newArry = []
            let firstCoords = 150
            let direction = ['horizontal', 'vertical'][Math.floor(Math.random()*2)]
            newArry.push({result: currentTempWordList[0], direction: direction, occupied: placeResult(currentTempWordList[0], direction, firstCoords)})
            setData(newArry)
            console.log("data now = ", newArry)
        }
    
        function placeResult(result, direction, firstCoords){
            let occupied = []
            for (let i=0; i<result.length; i++) {
                // let firstCoords = parseInt(X.toString() + Y.toString())
                if (direction =="vertical") {
                occupied.push (firstCoords + i*24 )}
                else {
                occupied.push (firstCoords + i)
                }
            }
            return occupied
        }
        // useEffect(() => {
        // setData([...data, ...dataCopy])
        // },[dataCopy])
        
        const findOne = (haystack, arr) => {
            return arr.some(v => haystack.includes(v));
        }

        let dataCopy = data
        let placements = []
        let filteredLetterObject = []
        let enhancedLetterObject = []
        let coordsToLay = []
        function placeResults() {
            if (missedCounter == 3) {
                setShowModal(true)
            }
            if  (placeIndex == currentTempWordList.length) {
                if (!missedWords.length) {
                    alert("those were all the words")
                    return
                    } else {
                    setCurrentTempWordlist(missedWords)
                    setPlaceIndex(0) 
                    setMissedWords([])
                    setMissedCounter(prev => prev+1)
                    return }
            } else {
            // placeFirstResult()
            // for (let i = 1; i < 2; i++) {
            console.log(currentTempWordList[placeIndex])
            Array.from(currentTempWordList[placeIndex]).forEach((alphabet_A, index_A) => {
                    // data.forEach((object) => {
                        // Array.from(object.result).forEach((alphabet_B, index_B)=> {
                        for (let j = data.length; j > 0; j--)
                            Array.from(data[(j-1)].result).forEach((alphabet_B, index_B)=> {
                                if (alphabet_A == alphabet_B) {
                                let intersectCoords = data[(j-1)].occupied[index_B]
                                let direction = invertDirection(data[(j-1)].direction)
                                let firstCoords = direction=='horizontal' ? intersectCoords-index_A : intersectCoords-(index_A*24)
                                coordsToLay = (placeResult(currentTempWordList[placeIndex], direction, firstCoords)).toString().split(',')
                                // let lastCoords = direction=='horizontal' ? intersectCoords : intersectCoords
                                let lastCoords  = findLastCoords(coordsToLay)
                                // console.log(coordsToLay)
                                // console.log(lastCoords)
                                // console.log(direction) 
                                // console.log(placeIndex)                             
                                filteredLetterObject = (Object.keys(letterObject).filter(item => item !== intersectCoords.toString()))
                                let roomToBreathe = addSurroundingCoords(filteredLetterObject, intersectCoords, direction)
                                enhancedLetterObject = enhancer(roomToBreathe)
                                // console.log(enhancedLetterObject)            
                                
                                if ((firstCoords > 0) && 
                                    (!(findOne(enhancedLetterObject, coordsToLay))) &&
                                    (direction=='horizontal'? notAJump(intersectCoords, index_A, lastCoords) : true) &&
                                    (!(lastCoords > (GL*rowAmt)))
                                    && (direction=='horizontal'? 
                                    !Object.keys(letterObject).includes((intersectCoords-1).toString()) 
                                    && !Object.keys(letterObject).includes((intersectCoords+1).toString()) 
                                    : !Object.keys(letterObject).includes((intersectCoords-GL).toString())
                                    && !Object.keys(letterObject).includes((intersectCoords+GL).toString()))
                                    // && placeResult(currentTempWordList[placeIndex], direction, firstCoords)
                                ) {
                                // console.log (notAJump(firstCoords, index_A))
                                placements.push({result: currentTempWordList[placeIndex], direction: direction, occupied: placeResult(currentTempWordList[placeIndex], direction, firstCoords)})
                                } 
                            } 
                            }) 
                            })      
                // } 
                if (placements.length) {
                let rand = [Math.floor(Math.random()*placements.length)]
                dataCopy = [(placements[rand])]
                placements = []
                // console.log(dataCopy)
                setData([...data, ...dataCopy])
                setPlaceIndex(prev => prev+1) 
                    } else if (placeIndex < (currentTempWordList.length)) {
                setMissedWords([...missedWords, currentTempWordList[placeIndex]])
                setPlaceIndex(prev => prev+1) 
                    } 
                }
            }

       
        let i = 0
        const notAJump = (a, b, c) => {
            // for (let i=0; i < rowAmt; i++) {
            while (i < rowAmt) {
            let RW = (SWR + (i * GL))   //Right Wall
            let LW = (SWR + ((i+1) * GL))   //Left Wall
                if ((a-b > RW) &&
                    (c < LW))
                   { return true
                } else {
                i ++
                }
            }
        return false
    }

    // let values
    // let keys

  

    function coordsToCellNo(X, Y) {
        return ((Y/50)*10) + (X/50)
    }

    let dataLength = (data.map((values) => values.result).length)

    // const pushToBoard = () => {

    let CellAmt = GL * rowAmt

        // newData = grid.map((item) => 
        //     Object.assign({}, item, {null})
        //     )
        // }

   

            // cell.key%2 == 0 ? console.log (cell.target) : null)
    
        // former modulus function
        // grid.forEach((cell) => (cell.key) % 2 == 0 ? console.log(cell.props) : console.log('red'))
        // grid.forEach((cell) => (cell.props.classList.add('blue')))
    

        // useEffect(() => {
        //     placeFirstResult()
        // }, [])

    function continueGame() {
        setShowModal(false)
    }

    function retrySetWords(){
        setShowModal(false)
    }

    const gridMapFunction = () => {
        let popNumber = occupiedAll.pop()
        let newGrid = grid.filter(item => 
            item.key < (popNumber))
            setGrid(newGrid)
        // console.log(occupiedAll.pop())
        // grid.map(item => console.log(item.key))

        }

        function hideBottom(){
            // grid.filter(item => )
        }
   
    return (          
         <div className = "cw-container-grid">
               {showModal && <div className ="content">
                <h4>{missedWords.length} words not placed</h4>
                <b></b>
                <p>Continue Anyway? </p>
                <button onClick={retrySetWords} className ="play-again">Try Again</button>
                <button onClick={continueGame} className ="play-again">Just Use These</button>
            </div>}
            <button onClick = {consoleLogFunction} style = {{width: "800px", height: "20px"}}>consoleLogButton</button>
        <div 
            style = {{
                      className: "cw-container",
                      display: "grid",  
                      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                      gridTemplateRows: `repeat(${gridRows}, 1fr)`}}
                    >
                {grid}
        </div>
        <div className= "question-container">
                <button style = {{width: "80px", height: "50px"}} onClick = {placeFirstResult}>Place First Result</button>
                {/* <button style = {{width: "80px", height: "50px"}} onClick = {gridMapFunction}>Grid Map Function</button> */}
                <button style = {{width: "80px", height: "50px"}} onClick = {findIndexesAndMinMatch}>Find Indexes</button>
                <button style = {{width: "80px", height: "50px"}} onClick = {findMinMatchAndPlace}>Find Min Match and Place</button>
        </div>
        </div>
    )
}

// <div className = "cw-body">
// <div id="cw-container">
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
//     <div className="cw-cell"></div>
// </div>
// </div>   
 
export default CrossWord