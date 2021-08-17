/**
 * 类型注解
 */
(function () {
    function showMsg(msg) {
        return '窗前明月光，' + msg;
    }
    var msg = ''; //[1, 2]
    console.log(showMsg(msg));
})();
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
