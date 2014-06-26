/*
* An Object Of This Class Will Represent The Game Space 
* @param width :  the space width 
* @param height : the spae height 
* @param step : the distance in canvas between each cell ( this gives us the actual coordinate of the cell on our canvas )
*/
function Grid(width,height,step)
{
	//============== Members ============//
	//== set width and height for the grid ( space)
	this.width=width; 
	this.height=height;
	this.step=step;
	
	//=== initialize grid contents ( cells)
	var cells=new Array(width+2); // +2 to give some border to our space so we don't have ( Array Out Of Index ) when checking for neighbours
    for(var i=0;i<=width+1;i++) 
	{
	  cells[i]=new Array(height+2);
	  for(var j=0;j<=height+1;j++)
		cells[i][j]=new Cell((j-1)*step,(i-1)*step);
	}
   //============== Members ============//
   
   //============== Methods ==============//
   
   //======================//
	/*
	* Update the status of all cells
	*/
	this.update=function(){
		for(var i=1;i<=width;i++)
		{
			for(var j=1;j<=height;j++)
				cells[i][j].updateStatus();
		}
	}
	//======================//
	
	//======================//
	/*
	* Get cell from the grid
	*@param i : cell row
	*@param j : cell col
	*@return : the spicified cell
	*/
	this.getCell=function(row,col){
		return cells[row][col];
	}
	//======================//
	
	//======================//
	/*
	* Get the count of cell neighbours
	*@param row : cell row
	*@param col : cell col
	*@return : neighbours count
	*/
	this.getLiveNeighbours=function(row,col){
		return (cells[row-1][col-1].currentStatus + cells[row-1][col].currentStatus + cells[row-1][col+1].currentStatus + 
			cells[row][col-1].currentStatus + cells[row][col+1].currentStatus + 
			cells[row+1][col-1].currentStatus + cells[row+1][col].currentStatus + cells[row+1][col+1].currentStatus);
	}
	//======================//
	
	//============== Methods ==============//
}