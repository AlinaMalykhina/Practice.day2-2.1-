alert('Hello, everyone!');
class Graphics1d {
  constructor({ canvasWidth = 600, canvasHeight = 600, f = (x) => x } = {}) {
    this.canvas = document.createElement('canvas');
    document.querySelector('#canvases').appendChild(this.canvas);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.xmin = -20;
    this.xmax = 20;
    this.ymin = -20;
    this.ymax = 20;
    this.fmin = this.ymin;
    this.fmax = this.ymax;
   this.canvas.width = canvasWidth;
     this.canvas.height = canvasHeight;
  this.zeroX = (Math.abs(this.xmin) / (Math.abs(this.xmin) + Math.abs(this.xmax))) * this.canvasWidth;
  this.zeroY = (Math.abs(this.ymin) / (Math.abs(this.ymin) + Math.abs(this.ymax))) * this.canvasHeight;
  this.stepX = this.canvasWidth / (Math.abs(this.xmin) + Math.abs(this.xmax));
  this.stepY = this.canvasHeight / (Math.abs(this.ymin) + Math.abs(this.ymax));
    this.f = f;
  }
  drawLine(lineColor, x1, y1, x2, y2){
    this.context.strokeStyle = lineColor;
    this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.closePath();
      this.context.stroke();
  }
  drawCoordinateGrid(){
    const gridColor = '#8FBC8B';

    for(let i = 1; (this.zeroX - this.stepX * i) > 0; i++){
    this.drawLine(gridColor, this.zeroX - this.stepX * i , 0, this.zeroX - this.stepX * i, this.canvasHeight);
  }
    for(let i = 1; (this.zeroX + this.stepX * i) < this.canvasWidth; i++ ){
      this.drawLine(gridColor, this.zeroX + this.stepX * i , 0, this.zeroX + this.stepX * i, this.canvasHeight);
    }
    for(let i = 1; (this.zeroY + this.stepY * i) < this.canvasHeight; i++ ){
      this.drawLine(gridColor,  0, this.zeroY + this.stepY * i , this.canvasWidth, this.zeroY + this.stepY * i);
    }
    for(let i = 1; (this.zeroY - this.stepY * i) > 0; i++ ){
      this.drawLine(gridColor,  0, this.zeroY - this.stepY * i , this.canvasWidth, this.zeroY - this.stepY * i);
    }
  }
  drawCoordinatePlane(lineColor) {
    this.drawLine(lineColor, this.zeroX, 0, this.zeroX, this.canvasHeight);
      this.drawLine(lineColor, 0, this.zeroY, this.canvasWidth, this.zeroY);
  }
  drawText(textColor){
this.context.font = '20px serif';
this.context.strokeStyle = textColor;
this.context.strokeText('('+this.xmin+';'+this.ymin+')', 10, this.canvasHeight-10);
this.context.strokeText('('+this.xmax+';'+this.ymax+')', this.canvasWidth - 70, 20);
  }
  drawFunction(functionColor){
    this.context.strokeStyle = functionColor;
    this.context.beginPath();
    for(let x = this.xmin; x < this.xmax; x+=0.1){
      const y = this.f(x);
      const coordX = this.zeroX + x * this.stepX;
      const coordY =  this.zeroY - y * this.stepY;
      if(x === this.xmin) {
        this.context.moveTo(coordX, coordY);
      } else {
        this.context.lineTo(coordX, coordY);

      }

    }
    this.context.stroke();

  }
  fillBackground(backgroundColor){
    this.context.fillStyle = backgroundColor;
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  evaluate(){
    this.pointsXArray = [];
    this.pointsYArray = [];
    for(let x = this.xmin; x < this.xmax; x+=0.1){
      this.pointsXArray.push(x);
    }
    for(let x = this.xmin; x < this.xmax; x+=0.1){
      const y = this.f(x);
      this.pointsYArray.push(y);
    }
    console.log('x', this.pointsXArray);
    console.log('y' ,this.pointsYArray);
  }
  autodraw() {
    console.log(Math.min(...this.pointsXArray));
    console.log(Math.max(...this.pointsYArray));
  }
  draw(lineColor, backgroundColor, functionColor, textColor, functionPointsColor, approximateZerosColor) {
    this.fillBackground(backgroundColor);
    this.drawCoordinateGrid();
    this.drawCoordinatePlane(lineColor);
    this.drawFunction(functionColor);
    this.drawText(textColor);
    this.evaluate();
    this.autodraw();
  }

}

new Graphics1d({ f: (x) => (10*Math.sin((x-1)/0.7)-15)+x*x}).draw('green', 'grey', 'red', 'black');;
