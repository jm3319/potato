// Store reference to the spinner and spinner container, create a rotate counter and null startTime
      // and create an uninitialized variable to store a requestAnimationFrame() call in,
      //store references to player displays and scores
      
      const spinner = document.querySelector('.spinner p');
      const spinnerContainer = document.querySelector('.spinner');
      const resultContainer = document.querySelector(".middlebar");
      const box = document.querySelectorAll('.box');
      let rotateCount = 0;
      let startTime = null;
      let rAF;
      let score1 = document.querySelector(".p1score");
      const p1 = document.querySelector(".p1");
      const p2 = document.querySelector(".p2");
      var p1count = 0;
      let score2 = document.querySelector(".p2score")
      var p2count = 0;

      // Store references to the start button and the result paragraph
      const btn = document.querySelector('button');
      const result = document.querySelector('.result');

      // function to generate random number
      function random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
      }

      // function to animate spinner
      function draw(timestamp) {
        if(!startTime) {
         startTime = timestamp;
        }

        rotateCount = (timestamp - startTime) / 3;
        
        // If rotateCount gets over 359, set it to 'remainder of dividing by 360'
        if(rotateCount > 359) {
          rotateCount %= 360;
        }

        // Set the rotation of the div to be equal to rotateCount degrees
        spinner.style.transform = 'rotate(' + rotateCount + 'deg)';

        // Call the next frame in the animation
        rAF = requestAnimationFrame(draw);
      }

      // Initially hide the spinner and results
      result.style.display = 'none';
      spinnerContainer.style.display = 'none';

      //resets to initial state after a game round
      function reset() {

        //updates score
        score1.textContent = `Score: ${p1count}`;
        score2.textContent = `Score: ${p2count}`;
        
        //resets UI components
        for (const items of box) {
            items.style.color="black";
            items.style.backgroundColor="white";
          }
        btn.style.display = 'block';
        result.textContent = '';
        result.style.display = 'none';
        fault = true;
        document.body.style.backgroundColor = "#a9a9a9";

        spinnerContainer.style.display = 'none';
        spinner.textContent="↻";

        //checks for score win condition
        gameOver();
        
      }

      function gameOver() {
        let winner = '';
        let over = false;
        if (p1count==5) {
          winner = '1';
          over= true;
        }
        if (p2count==5) {
          winner = '2';
          over = true;
        }

        if (over) {
          result.style.display = 'block'; 
          result.textContent= "Game Over: \n" + `Player ${winner} is the winner!`;
          p1count = 0;
          p2count = 0;
        }

      }

      // Start the game when the button is pressed

      btn.addEventListener('click', start);

      function start() {

        reset();


        console.log(p1);
        // Start the spinner spinning
        draw();
        // Show the spinner and hide the button
        spinnerContainer.style.display = 'block';
        btn.style.display = 'none';
        // run the setEndgame() function after a random number of seconds between 5 and 10
        gameWrapper();
      }

      //initializes game after start button

      function gameWrapper() {
        var timer = random(1000,4000);
        var nofault = document.addEventListener('keydown', faultHandler);
        setTimeout(removeFault, timer);
        
        //calls reaction game state after random time interval
        var win = setTimeout(setEndgame,timer);
  
        //removes fault game state after same time interval
        function removeFault() {
          document.removeEventListener('keydown', faultHandler);
        }
        
        //handles early fault state

        function faultHandler(e) {
            let isOver = false;
            console.log(e.key);
            
            if (e.key === "a") {
                result.textContent = 'Player 1 fault!!';
                p1.style.backgroundColor= "#996666";
                p1count--;
                isOver = true;
            } else if (e.key === "l") {
                result.textContent = 'Player 2 fault!!';
                p2.style.backgroundColor= "#996666";
                p2count--;
                isOver = true;
            }

            if (isOver) {
                cancelAnimationFrame(rAF);
                clearTimeout(win);
                spinnerContainer.style.display = 'none';
                result.style.display = 'block';
                document.removeEventListener('keydown', faultHandler);
                setTimeout(reset, 1000);
            }
            };
        

      }

 

  



      // sets final game state
      function setEndgame() {
        document.body.style.backgroundColor = "black";
        cancelAnimationFrame(rAF);

        spinnerContainer.style.display = 'none';
        result.style.display = 'block'; 
        result.style.backgroundColor = "#FFF";
        result.textContent = 'GO!!';
        invert();
      

        function invert() {
          for (const items of box) {
            items.style.color="#fff";
            items.style.backgroundColor="black";
          }
        }

        function revert() {
          for (const items of box) {
            items.style.color="black";
            items.style.backgroundColor="white";
          }
        }
        

        document.addEventListener('keydown', keyHandler);

        function keyHandler(e) {
          let isOver = false;
          console.log(e.key);
          
          if (e.key === "a") {
            result.textContent = 'Player 1 success!!';
            p1count++;
            p1.style.backgroundColor= "#666699";
            
            isOver = true;
          } else if (e.key === "l") {
            result.textContent = 'Player 2 success!!';
            p2.style.backgroundColor= "#666699";
            p2count++;
            
            isOver = true;
          }

          if (isOver) {
          
            document.removeEventListener('keydown', keyHandler);
            setTimeout(reset, 1000);
    
          }
        };
      }

      