/**
 * 枚举
 */
(function () {
    var Score;
    (function (Score) {
        Score[Score["A"] = 0] = "A";
        Score[Score["B"] = 1] = "B";
        Score[Score["C"] = 2] = "C";
    })(Score || (Score = {}));
    var score = Score.B;
    console.log(score);
})();
