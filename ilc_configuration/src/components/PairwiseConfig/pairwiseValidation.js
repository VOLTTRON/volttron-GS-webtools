import {_PAIRWISE } from '../../constants/strings';
import {clone} from '../../utils/clone'


export default function PairwiseValidate(configuration, clusterFocus, setting){
    const extractCriteria = () => {
        const configMatrix= clone(configuration[`${clusterFocus}${_PAIRWISE}`][setting])
        const criteriaArray = clone(configuration["criteria"][clusterFocus])
        let criteriaLabels = []
        let criteriaMatrix = []
        let indexOf = [];
        let counter = 0;
        for (const [parentPairwiseName, parentPairwiseValue] of Object.entries(configMatrix)){
            indexOf[parentPairwiseName] = counter;
            counter++;
        }
        Object.keys(configMatrix).map((criteria, index) => {

            criteriaLabels.push(criteria)
            criteriaMatrix.push([])
            Object.keys(configMatrix).map((value, index2) => {
                criteriaMatrix[index][index2] = 0.0
            })
        })
        for (const [parentPairwiseName, value] of Object.entries(configMatrix)){
            let row = indexOf[parentPairwiseName];
            criteriaMatrix[row][row] = 1.0
            for(const [pairwiseName, pairwiseValue] of Object.entries(value)){
                let col = indexOf[pairwiseName];
                criteriaMatrix[row][col] = configMatrix[parentPairwiseName][pairwiseName]
                criteriaMatrix[col][row] = 1 / criteriaMatrix[row][col]
            }
            row++;
        }
        return criteriaMatrix
    }


    const calcColumnSums = (criteriaMatrix) => {
        let j = 0;
        let colSums = [];
        for (let i = 0; i < criteriaMatrix.length; i++){
            let col = []
            criteriaMatrix.forEach(row => {
                col.push(row[i])
            })
            let sum = 0;
            col.forEach(value => {
                sum = sum + value;
            })
            colSums.push(sum);
        }

        return colSums
    }

    const normalizeMatrix = (criteriaMatrix, colSums) => {
        let normalizedMatrix = [];
        let rowSums = [];
        let i = 0;

        criteriaMatrix.forEach(row => {
            let j = 0;
            let normRow = [];
            row.forEach(value => {
                normRow.push(criteriaMatrix[i][j]/(colSums[j] ? colSums[j] : 1))
                j++;
            })
            let rowSum = 0;
            normRow.forEach(value => {
                rowSum = rowSum + value;
            }) 
            normRow.push(rowSum/j)
            rowSums.push(rowSum/j)
            normalizedMatrix.push(normRow)
            i++;
        })
        return rowSums;
    }

    const validateInput = (pairwiseMatrix, colSums) => {
        const randomIndex = [0, 0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
        let roots = [];
        pairwiseMatrix.forEach(row => {
            let reduceValue = 1;
            row.forEach(value =>{
                reduceValue = reduceValue * value;
            })
            roots.push(Math.pow(reduceValue, .2))
        })
        // sum the vector of products
        let rootSum = 0;
        roots.forEach(root=> {
            rootSum = rootSum + root;
        })
        // calculate the priority vector
        let priorityVec = [];
        roots.forEach(root => {
            priorityVec.push(root/rootSum)
        })
        // calculate the priority row
        let priorityRow = [];
        colSums.forEach((colSum, index) => {
            priorityRow.push(colSum * priorityVec[index])
        })
        // sum the priority row
        let priorityRowSum = 0;
        priorityRow.forEach(value => {
            priorityRowSum = priorityRowSum + value;
        })
        // calculate the consistency index
        let ncols = colSums.length;
        ncols = (ncols - 1 >= 1) ? ncols -1 : 1;
        const consistencyIndex = (priorityRowSum - colSums.length)/ncols
        // calculate the consistency ratio
        let rindex = randomIndex[colSums.length];
        rindex = rindex >= .3 ? rindex : .3;
        const consistencyRatio = consistencyIndex / rindex;
        return consistencyRatio
    }



    const criteriaMatrix = extractCriteria();
    const colSums = calcColumnSums(criteriaMatrix);
    const rowAverage = normalizeMatrix(criteriaMatrix, colSums)
    const consistencyRatio = validateInput(criteriaMatrix, colSums);
    
return(consistencyRatio)
    
}

