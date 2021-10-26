

function nom1()
    {
    var a = Number(prompt('Номер 1 \n Введите первое слагаемое:'));
    var b = Number(prompt('Введите второе слагаемое:')); 
    function sum(a,b) {return a+b;}
    document.writeln("<br/>№1<br/> A + B = "+a + " + " + b + " = " + sum(a,b) + '<br/>');
    //setTimeout(() => {  document.write("World!"); }, 2000);


    //confirm('2 номер?');
    }


function nom2()
    {
       var str = prompt('Номер 2 \n Введите строку:');
       var newstr = '';

       function reverseCase(str)
       {
       for ( i = 0; i < str.length; i++) 
            {
            if (str[i] === str[i].toLowerCase())  { newstr = newstr + str[i].toUpperCase()} 
            else {newstr = newstr + str[i].toLowerCase()}
            }
            return newstr
       }
       document.write('<br/>№2<br/>' + str + ' => ' + reverseCase(str) + '<br/>');
       //return newstr;
       //document.write(str + ' => ' + newstr);


    }


function nom3()
    {
        var l = prompt('Номер 3 \n Введите количество элементов в массиве:');
        var mass = new Array();
        for (i = 0; i < l; i++) 
        {
            mass[i] = prompt('Элемент №' + (i+1));  
        }

        function reverseArray(mass)
            {
               return mass.reverse()
            }

        document.write('<br/>№3<br/>['+mass +'] => [' + reverseArray(mass)+']<br/>');
    }



    
nom1();
nom2();
nom3();