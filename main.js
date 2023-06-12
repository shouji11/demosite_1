
var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
	canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#00ffff']);
	// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 1, 3, 0);//drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
		var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis + i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y + xAxis);
    }
}


/*       背景        */

/*       宣言        */
var bgImg1 = document.getElementById("cloud01");
var bgImg2 = document.getElementById("cloud02");

/*    スクロール      */

function scrollBG(){
    //手前の画像
	bgImg1.style.height = "100px"; //*1 表示の高さ
	bgImg1.style.backgroundImage = "url()"; //*2 画像ファイル
	bgImg1.style.backgroundRepeat = "repeat-x"; //*3 横に連続して表示
	//奥の画像
	bgImg2.style.height = "100px"; //*1 表示の高さ
	bgImg2.style.backgroundImage = "url()"; //*2 画像ファイル
	bgImg2.style.backgroundRepeat = "repeat-x"; //*3 横に連続して表示
	
	count = 0; //カウントの初期値
	timerID = setInterval('scrollBG_countup()',500); //*4 0.5秒毎に呼び出し
}
function scrollBG_countup() {
	count++; //増分
	if (count > 99) count = 0; //カウントをリセット
	bgImg1.style.backgroundPosition = (count * 2) + "px 0px"; //2倍の位置移動
	bgImg2.style.backgroundPosition = count + "px 0px"; //表示位置を変更
}

/*                       */

function set2fig(num) {
    // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
 }

function ChangeColor(hour){
    var color1;
    var obj = document.getElementById("bgCol");
    
    if(hour_now === hour)return;    
    var hour_now = hour;
    switch(hour_now){
        case 5:
        case 6:
            color1 = "#f19072";
            break;
            
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:    
            color1 = "#87ceeb";
            break;

        case 12:
        case 13:
        case 14:    
            color1 = "#00bfff";
            break;
        
        case 15:
        case 16:
        case 17:
            color1 = "#eb6101";
            break;

        case 18:
        case 19:
            color1 = "#1c2c52";
            break;

        case 20:
        case 21:
        case 22:
        case 23:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            color1 = "#051637";
            break;
            
    }
    obj.style.backgroundColor = color1;

}

function Clock(){
    var now = new Date();
    var clockDate = document.getElementById("date");
    let hour = set2fig(now.getHours());
    let minute = set2fig(now.getMinutes());
    let msg = " " + hour + ":" + minute ;    // 時分秒

    ChangeColor(hour); 
    clockDate.innerHTML = msg;   
}
setInterval("Clock()",1000);



init();