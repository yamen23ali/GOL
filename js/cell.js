/*
* An Object Of This Class Will Represent A Cell In The 
*  Game Space
* @param x : the x coordinate for the cell
* @param y : the y coordinate for the cell
*/

function Cell(x,y)
{
	//============== Members ============//
	//==== the coordination of the cell in the space
	this.x=x;
	this.y=y;
	
	//====current status of the cell ( 0: dead , 1: live )
	this.currentStatus=0;
	//==== the status of the cell in the next generation
	this.nextStatus=0;
	//============== Members ============//
	
	//============== Methods ============//
	
	//======================//
	/*
	* Kill the cell in the next generation ( mark this cell as dead ) 
	*/
	this.kill=function(){
		this.nextStatus=0;
	}
	//======================//
	
	//======================//
	/*
	* Revive the cell in the next generation ( mark this cell as live ) 
	*/
	this.revive=function(){
		this.nextStatus=1;
	}
	//======================//
	
	//======================//
	/*
	* Revive or kill the cell in the current and next generation ( depends on user click )
	* this function is used when the cell is selected or unselected as a seed 
	*/
	this.setSeed=function(){
	    //
		if(this.currentStatus==0)
		{
			this.currentStatus=1;
			this.nextStatus=1;
			return 1;
		}
		else
		{
			this.currentStatus=0;
			this.nextStatus=0;
			return 0;
		}
	}
	//======================//
	
	//======================//
	/*
	* Update the cell current status
	*/
	this.updateStatus=function(){
		this.currentStatus=this.nextStatus;
	}
	//======================//
	
	//============== Methods ============//
}