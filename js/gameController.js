/*
* An Object Of This Class Will Control The Game Of Life 
* @param canvasId :  the id of the canvas that we will draw on 
* @param canvasParentId :  the id of the container of the canvas
* @param step :  the size of the cell in the canvas ( how many coordinates does it take ) 
* @param maxX :  the last x coordinate in our canvas
* @param maxY :  the last y coordinate in our canvas
* @param rows :  the number of rows in our grid
* @param columns :  the number of columns in our grid
*/
function GameController(canvasId,canvasParentId,step,maxX,maxY,rows,columns)
{
	//============== Members ============//
	var rows=rows;
	var columns=columns;
	this.canvasId=canvasId;
	this.canvasParentId=canvasParentId;
	this.step=step;
	this.maxX=maxX;
	this.maxY=maxY;
	this.cellColor="66ff00";
	
	var liveCells=new Array();// list of all live cells
	var refreshIntervalId=-1;
	var grid=new Grid(rows,columns,step);
	var space=new SpaceCanvas(this);
	//============== Members ============//
	
	//============== Methods ==============//
	
	space.draw(); //draw our space
	
	//======================================//
	/*
	* This Function is reponsible for moving through generations 
	* Here we update the cell values and color the canvas accordingly
	*/
	this.nextGeneration=function() {
		//alert("here");
		// empty the cells from the previous generation
		space.fillClear(liveCells,2);
		
		liveCells=new Array();
		
		for(var i=1;i<=grid.width;i++)
		{
			for(var j=1;j<=grid.height;j++)
			{
				var cell=grid.getCell(i,j);
				var liveNeighboursCount=grid.getLiveNeighbours(i,j);
				// if cell is live
				if(cell.currentStatus==1){
					if(liveNeighboursCount==3 || liveNeighboursCount==2 ) 
						liveCells[liveCells.length]={x:cell.x,y:cell.y};	// keep it live for the next generation	
					else
						cell.kill(); // kill it
				}
				else if(liveNeighboursCount==3){ // if cell is dead but have 3 live neighbours
					liveCells[liveCells.length]={x:cell.x,y:cell.y};		// revive the cell in the next generation
					cell.revive();
				}
			}
		}
		// update the values ( move to next generation)
		grid.update();

		// color the live cells
		space.fillClear(liveCells,1);
	}
	//======================================//
	
	//=======================================//
	/* Start The game and move to next generation each interval
	* @param interval : time between each generation
	*/
	this.start=function(interval,famousSeed){
	    // fill grid with famous seeds in case any is selcted
		if(famousSeed>1)
			this.fillFamousSeed(famousSeed);
		// stop any runnig interval if exists
		 if(refreshIntervalId!=-2)
			this.stop();
		// run the game
		refreshIntervalId=setInterval(
						(function(self) 
						 {
							return function() { self.nextGeneration(); }   //Return a function in the context of 'self'
						 })(this),interval);
	}
	//=======================================//
	
	//=======================================//
	/* Stop The game 
	*
	*/
	this.stop=function(){
		clearInterval(refreshIntervalId);
	}
	//=======================================//
	
	//=======================================//
	/* Add Cell as seed ( when user click on it) 
	* @param x : the x coordinates where user cliked
	* @param y : the y coordinates where user cliked
	* @return true : if cell is live , false : if cell is dead
	*/
	this.addRemoveSeed=function(x,y){
		liveCells[liveCells.length]={x:x,y:y};
		return grid.getCell((y/this.step)+1,(x/this.step)+1).setSeed();
	}
	//===============================//
	
	//======================//
	/*
	* To zoom in or out our space canvas
	*@param type: the type of zooming ( in =1 , out =2 )
	*/
	this.zoom=function(type){
		space.zoom(type);
		// refill because zooming will clear the cells
		space.fillClear(liveCells,1);
	}
	//======================//
	
	//=====================//
	this.fillFamousSeed=function(seedNum){
		grid=new Grid(rows,columns,this.step);
		if(seedNum==2)
		{
			grid.getCell(25,25).setSeed();
			grid.getCell(25,26).setSeed();
			grid.getCell(25,27).setSeed();
		}
		else if(seedNum==3)
		{
			grid.getCell(25,25).setSeed();
			grid.getCell(25,26).setSeed();
			grid.getCell(25,27).setSeed();
			grid.getCell(26,26).setSeed();
			grid.getCell(26,25).setSeed();
			grid.getCell(26,24).setSeed();
		}
		else if(seedNum==4)
		{
			for(var i=0;i<10;i++)
				grid.getCell(25,25+i).setSeed();
		}
		else if(seedNum==5)
		{
			grid.getCell(25,25).setSeed();
			grid.getCell(26,24).setSeed();
			grid.getCell(26,25).setSeed();
			grid.getCell(26,26).setSeed();
			grid.getCell(27,24).setSeed();
			grid.getCell(27,26).setSeed();
			grid.getCell(28,24).setSeed();
			grid.getCell(28,25).setSeed();
			grid.getCell(28,26).setSeed();
			grid.getCell(29,25).setSeed();
			
		}
		else if(seedNum==6)
		{
			grid.getCell(25,35).setSeed();
			grid.getCell(25,36).setSeed();
			grid.getCell(26,35).setSeed();
			grid.getCell(26,34).setSeed();
			grid.getCell(27,35).setSeed();
		}
		else if(seedNum==7)
		{
			grid.getCell(10,45).setSeed();
			grid.getCell(11,45).setSeed();
			grid.getCell(10,47).setSeed();
			grid.getCell(12,45).setSeed();
			grid.getCell(12,46).setSeed();
		}
	}
	//=====================//
	//============== Methods ==============//
	
	
	
}