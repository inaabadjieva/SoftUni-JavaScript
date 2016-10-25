let calc = (function () {
    function add(vectorA, vectorB) {
        return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]]
    }
    
    function multiply(vectorA, scalar) {
        return [vectorA[0] * scalar, vectorA[1] * scalar]
    }

    function length(vector) {
        return Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
    }

    function dot(vectorA, vectorB) {
        return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1]
    }

    function cross(vectorA, vectorB) {
        return (vectorA[0] * vectorB[1]) - (vectorA[1] * vectorB[0]);
    }

    return { add, multiply, length, dot, cross }
})();

console.log(calc.add([1,1], [1,0]));
console.log(calc.multiply([3.5, -2], 2));
console.log(calc.length([3, -4]));
console.log(calc.dot([1, 0], [0, -1]));
console.log(calc.cross([3, 7], [1, 0]));