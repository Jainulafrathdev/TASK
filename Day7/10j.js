let calculation=(localStorage.getItem('calculation') || ' ');
      displayCalculation();
      
      function updateCalculation(operation){
      calculation+=operation;
      displayCalculation();
      localStorage.setItem('calculation', calculation);
      }  

      function displayCalculation(){
        document.querySelector('.para-tag').innerHTML=calculation;
      }

     