function Circle() {
    createjs.Shape.call(this);
    this.setCircleType= function(type){
        this._circleType = type;
        switch (type){
            case Circle.TYPE_UNSELECTED:
                this.setColor("#cccccc");
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("#FB8A6C");
                break;
            case Circle.TYPE_CAT:
                // this.setColor("#0000ff");
                this.setColor("#cccccc");
                break;
        }

    }

    this.setColor=function(colorString){
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0,0,45);
        this.graphics.endFill();
    }
    this.getCircleType=function(){
        return this._circleType;
    }
    this.setCircleType(Circle.TYPE_UNSELECTED);
}


 var  w = window.innerWidth,
      h = window.innerHeight;
Circle.prototype=new createjs.Shape();
Circle.TYPE_UNSELECTED=1;
Circle.TYPE_SELECTED=2;
Circle.TYPE_CAT=3;