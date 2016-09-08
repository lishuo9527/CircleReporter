var stage,gameView,currentCat,circleArr,canvas,num = 0,
	w = window.innerWidth,
	h = window.innerHeight;
var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UPLEFT = 1, MOVE_UPRIGHT = 2, MOVE_RIGHT = 3, MOVE_DOWNRIGHT = 4, MOVE_DOWNLEFT = 5,
	circleArr = [[], [], [], [], [], [], [], [], []];

function init(){
	//设置canvas属性
	canvas = document.getElementById('gameView');
	canvas.width = w;
	canvas.height = h;

	stage = new createjs.Stage("gameView");
	createjs.Ticker.setFPS(10);
	createjs.Ticker.addEventListener("tick", stage);

	gameView = new createjs.Container();
	gameView.x = w/10;
	gameView.y = h/3;
	stage.addChild(gameView);

	addCircles();

	startImg = document.getElementById('startImg');
	startImg.addEventListener("click",startGame);

	var replay = document.getElementById('replay');
	replay.addEventListener("click",function(){
		location.reload();
	})

	var replay1 = document.getElementById('replay1');
	replay1.addEventListener("click",function(){
		location.reload();
	})

}

function startGame(){
	document.getElementById('startImg').style.display = "none";
	document.getElementById('game').style.display = "block";
}

function getMoveDir(cat){
	var distanceMap = [];
	//left
	var can = true;
	for (var x = cat.indexX; x >= 0; x--){
		if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_LEFT] = cat.indexX - x;
			break;
		}
	}
	if (can) return MOVE_LEFT;
	//left up
	can = true;
	var x = cat.indexX, y = cat.indexY;
	while (true){
		if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED)
		{
			can = false;
			distanceMap[MOVE_UPLEFT] = cat.indexY - y;
			break;
		}
		if (y % 2 == 0)x--;
		y--;
		if (y < 0 || x < 0) break;
	}
	if (can)return MOVE_UPLEFT;
	//rightup
	can = true;
	x = cat.indexX, y = cat.indexY;
	while (true){
		if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_UPRIGHT] = cat.indexY - y;
			break;
		}
		if (y % 2 == 1) x++;
		y--;
		if (y < 0 || x > 8) break;
	}
	if (can) return MOVE_UPRIGHT;
	//right
	can = true;
	for (var x = cat.indexX; x < 9; x++){
		if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED)
		{
			can = false;
			distanceMap[MOVE_RIGHT] = x - cat.indexX;
			break;
		}
	}
	
	if (can) return MOVE_RIGHT;
	//right down
	can = true;
	x = cat.indexX;
	y = cat.indexY;
	while (true){
		if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_DOWNRIGHT] = y - cat.indexY;
			break;
		}
		if (y % 2 == 1)x++;
		y++;
		if (y > 8 || x > 8) break;
	}
	if (can) return MOVE_DOWNRIGHT;
	//left down
	can = true;
	x = cat.indexX;
	y = cat.indexY;
	while (true){
		if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_DOWNLEFT] = y - cat.indexY;
			break;
		}
		if (y % 2 == 0) x--;
		y++;
		if (y > 8 || x < 0) break;
	}
	if (can) return MOVE_DOWNLEFT;
	var maxDir = -1, maxValue = -1;
	for (var dir = 0; dir < distanceMap.length; dir++){
		if (distanceMap[dir] > maxValue){
			maxValue = distanceMap[dir];
			maxDir = dir;
		}
	}
	if (maxValue > 1) return maxDir;
	else return MOVE_NONE;
}

function circleClicked(event){
	num++;
	if (event.target.getCircleType() != Circle.TYPE_CAT){
		event.target.setCircleType(Circle.TYPE_SELECTED);
	}
	else{
		return;
	}
	if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8){
		failed();
		return;
	}
	var dir = getMoveDir(currentCat);
	switch (dir){
		case MOVE_LEFT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexX - 1][currentCat.indexY];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		case MOVE_UPLEFT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY - 1];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		case MOVE_UPRIGHT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY - 1];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		case MOVE_RIGHT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexX + 1][currentCat.indexY];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		case MOVE_DOWNRIGHT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY + 1];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		case MOVE_DOWNLEFT:
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY + 1];
			currentCat.setCircleType(Circle.TYPE_CAT);
			drawCat(currentCat.x,currentCat.y);
			break;
		default :
			victory(num);
	}
}

function addCircles(){
	for (var indexY = 0; indexY < 9; indexY++){
		for (var indexX = 0; indexX < 9; indexX++){
			var c = new Circle();
			gameView.addChild(c);
			circleArr[indexX][indexY] = c;
			c.x = indexY % 2 ? indexX * 95 + 45 : indexX * 95;
			c.y = indexY * 95;
			c.indexX = indexX;
			c.indexY = indexY;
			if (indexX == 4 && indexY == 4){
				c.setCircleType(3);
				currentCat = c;
				drawCat(currentCat.x,currentCat.y);
			}
			else if (Math.random() < 0.3){
				c.setCircleType(Circle.TYPE_SELECTED);
			}
			c.addEventListener("click", circleClicked);
		}
	}
}

function drawCat(x,y) {
    cat = document.getElementById('cat');
    cat.style.display = "block";
    x += 50;
    y += h/3 + 40;
    cat.style.left = x + "px";
	cat.style.top = y + "px";
}

function failed(){
	document.getElementById('startImg').style.display = "none";
	document.getElementById('game').style.display = "none";
	document.getElementById('failed').style.display = "block";
	var rand = Math.random() + "";
    var index = rand.charAt(5);
    var msgs = new Array();
    msgs[1] = 'I AM ANGRY!';
    msgs[2] = '看来你还没有身经百战！';
    msgs[3] = '他们要搞个大新闻了！';
    msgs[4] = '你们这样子啊，是不行的!';
    msgs[5] = 'NAVIE!';
    msgs[6] = '这还怎么谈笑风生!';
    msgs[7] = '很惭愧啊！';
    msgs[8] = '无可奉告！';
    msgs[9] = '识得唔识得啊？';
    msgs[0] = '闷声发大财！';
    var quote = msgs[index];
    var failedMsg = document.getElementById("failedMsg");
    failedMsg.innerText = "记者跑了？\n\n" + quote;
    paybgm("failed");
}

function victory(num){
	document.getElementById('startImg').style.display = "none";
	document.getElementById('game').style.display = "none";
	document.getElementById('victory').style.display = "block";
	var victoryMsg = document.getElementById("victoryMsg");
	victoryMsg.innerText = "\n你用了 " + num + " 步围住了记者！\n\n" + "Excited！";
	paybgm("victory");
}

function paybgm(name) {
  var audio = document.getElementById('audio');
  audio.src = "sound/"+ name +".mp3";
  audio.play();
}


init();

